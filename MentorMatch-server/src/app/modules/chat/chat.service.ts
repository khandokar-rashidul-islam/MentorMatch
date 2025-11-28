/* eslint-disable @typescript-eslint/no-explicit-any */
// src/modules/chat/chat.service.ts
import mongoose from "mongoose";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { ConversationModel, MessageModel } from "./chat.model";
import { UserModel } from "../user/user.model";
import { MentorProfileModel } from "../mentor/mentor.model";
import QueryBuilder from "../../../Query/BaseQuery";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { IMessageAttachment } from "./chat.interface";

const ObjectId = mongoose.Types.ObjectId;

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Find a conversation document between learner and mentor (order-independent)
 */
export const findConversationBetween = async (
  learnerId: string,
  mentorId: string
) => {
  if (!learnerId || !mentorId) return null;
  return ConversationModel.findOne({
    learnerId: new ObjectId(learnerId),
    mentorId: new ObjectId(mentorId),
  });
};

/* -------------------------------------------------------------------------- */
/* Create or return existing conversation                                     */
/* -------------------------------------------------------------------------- */

/**
 * Create or return existing conversation between learner & mentor.
 * Enforces:
 *  - cannot create conversation with oneself
 *  - mentor must have an approved mentor profile
 */
export const createOrGetConversation = async (
  learnerId: string,
  mentorId: string,
  initialText?: string
) => {
  if (!learnerId || !mentorId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "learnerId and mentorId are required"
    );
  }

  if (learnerId === mentorId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Cannot create a conversation with yourself"
    );
  }

  // Validate existence of users
  const [learnerUser, mentorUser] = await Promise.all([
    UserModel.findById(learnerId).select("_id role"),
    UserModel.findById(mentorId).select("_id role"),
  ]);
  if (!learnerUser)
    throw new AppError(httpStatus.NOT_FOUND, "Learner not found");
  if (!mentorUser) throw new AppError(httpStatus.NOT_FOUND, "Mentor not found");

  // Ensure mentor profile exists and is approved
  const mentorProfile = await MentorProfileModel.findOne({
    user: mentorId,
  }).select("approvalStatus");
  if (!mentorProfile || mentorProfile.approvalStatus !== "approved") {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Target user is not an approved mentor"
    );
  }

  // If conversation exists — return it
  const existing = await findConversationBetween(learnerId, mentorId);
  if (existing) return existing;

  // Create conversation
  const conversation = await ConversationModel.create({
    learnerId: new ObjectId(learnerId),
    mentorId: new ObjectId(mentorId),
    lastMessage: initialText ?? undefined,
    lastMessageAt: initialText ? new Date() : undefined,
  });

  // If there is an initialText, also create a message record
  if (initialText) {
    await MessageModel.create({
      conversation: conversation._id,
      sender: new ObjectId(learnerId),
      senderRole: "learner",
      text: initialText,
      isRead: false,
    });
  }

  return conversation;
};

/* -------------------------------------------------------------------------- */
/* List conversations for a user (inbox)                                      */
/* -------------------------------------------------------------------------- */

export const listConversationsForUser = async (
  userId: string,
  activeRole: "mentor" | "learner",
  query: Record<string, any> = {}
) => {
  if (!userId) throw new AppError(httpStatus.BAD_REQUEST, "userId required");

  // ----------------------------------------
  // ROLE-BASED FILTERING  ✔
  // ----------------------------------------
  const filter =
    activeRole === "mentor"
      ? { mentorId: new ObjectId(userId) }
      : { learnerId: new ObjectId(userId) };

  // ----------------------------------------
  // QUERY BUILDER (search/sort/pagination)
  // ----------------------------------------
  const baseQuery = ConversationModel.find(filter);

  const convsQuery = new QueryBuilder(baseQuery, query)
    .search(["lastMessage"])
    .sort()
    .paginate()
    .fields();

  const convs = await convsQuery.modelQuery
    .populate([
      {
        path: "learnerId",
        select: "email learnerProfile",
        populate: {
          path: "learnerProfile",
          select: "name profileImage profession",
        },
      },
      {
        path: "mentorId",
        select: "email mentorProfile",
        populate: {
          path: "mentorProfile",
          select: "name profileImage profession approvalStatus",
        },
      },
    ])
    .lean();

  // ----------------------------------------
  // TRANSFORM FOR FRONTEND INBOX   ✔
  // ----------------------------------------
  const transformed = convs.map((c: any) => {
    const other = activeRole === "mentor" ? c.learnerId : c.mentorId;

    const name =
      other?.learnerProfile?.name ||
      other?.mentorProfile?.name ||
      other?.email ||
      "Unknown";

    const avatar =
      other?.learnerProfile?.profileImage ||
      other?.mentorProfile?.profileImage ||
      null;

    return {
      id: c._id.toString(),
      participant: {
        id: other._id.toString(),
        name,
        avatar,
        role: activeRole === "mentor" ? "learner" : "mentor",
        isOnline: false, // <-- integrate presence later
      },
      lastMessage: c.lastMessage || "",
      timestamp: c.lastMessageAt || c.updatedAt,
    };
  });

  const pagination = await convsQuery.countTotal();

  return { conversations: transformed, pagination };
};


/* -------------------------------------------------------------------------- */
/* Send message                                                                */
/* -------------------------------------------------------------------------- */

export const sendMessage = async (payload: {
  conversationId?: string;
  senderId: string;
  senderRole: "learner" | "mentor";
  mentorId?: string;
  text?: string;
  customOrder?: any;
  attachmentFiles?: Express.Multer.File[];
  io?: any;
}) => {
  const {
    conversationId,
    senderId,
    senderRole,
    mentorId,
    text,
    customOrder,
    attachmentFiles,
    io,
  } = payload;

  // 1. Conversation logic (same as your code)
  let conversation = null;
  if (!conversationId) {
    if (senderRole !== "learner") {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "Only learner can create a conversation"
      );
    }
    if (!mentorId) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "mentorId required to create conversation"
      );
    }

    conversation = await findConversationBetween(senderId, mentorId);
    if (!conversation)
      conversation = await createOrGetConversation(senderId, mentorId);
  } else {
    conversation = await ConversationModel.findById(conversationId);
    if (!conversation)
      throw new AppError(httpStatus.NOT_FOUND, "Conversation not found");
  }

  // 2. Check participant
  const senderIsParticipant =
    conversation.learnerId.toString() === senderId ||
    conversation.mentorId.toString() === senderId;

  if (!senderIsParticipant) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not a participant of this conversation"
    );
  }

  // 3. Upload attachments if any
  const attachments: IMessageAttachment[] = [];

  if (attachmentFiles && attachmentFiles.length > 0) {
    for (const file of attachmentFiles) {
      const uploaded = await sendImageToCloudinary(
        `msg-${Date.now()}-${file.originalname}`,
        file.buffer
      );

      attachments.push({
        url: uploaded.secure_url,
        name: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        type: file.mimetype.startsWith("image") ? "image" : "file",
      });
    }
  }

  // 4. Create message
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const messageDoc = await MessageModel.create(
      [
        {
          conversation: conversation._id,
          sender: new ObjectId(senderId),
          senderRole,
          text,
          attachments,
          customOrder,
          isRead: false,
          isDelivered: false,
        },
      ],
      { session }
    );

    const message = messageDoc[0];

    // Update conversation
    conversation.lastMessage =
      text ?? (attachments.length ? "Sent an attachment" : "");
    conversation.lastMessageAt = message.createdAt;
    await conversation.save({ session });

    await session.commitTransaction();
    session.endSession();

    // Populate message sender
    const populated = await MessageModel.findById(message._id).populate({
      path: "sender",
      select: "email role",
      populate: [
        {
          path: "learnerProfile",
          select: "name profileImage profession",
        },
        {
          path: "mentorProfile",
          select: "name profileImage profession",
        },
      ],
    });

    //5. AUTO-DELIVER (receiver online → delivered)

    if (io) {
      const roomId = conversation._id.toString();

      // emit message
      io.to(roomId).emit("new-message", populated);

      // mark delivered
      await MessageModel.findByIdAndUpdate(message._id, { isDelivered: true });

      io.to(roomId).emit("message-delivered", {
        messageId: message._id,
      });
    }

    return { message: populated, conversation };
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

/* -------------------------------------------------------------------------- */
/* Get messages (pagination)                                                   */
/* -------------------------------------------------------------------------- */

export const getMessages = async (
  conversationId: string,
  query: Record<string, any> = {}
) => {
  if (!conversationId)
    throw new AppError(httpStatus.BAD_REQUEST, "conversationId is required");

  const conversation = await ConversationModel.findById(conversationId);
  if (!conversation)
    throw new AppError(httpStatus.NOT_FOUND, "Conversation not found");

  // Base query
  let baseQuery = MessageModel.find({
    conversation: new ObjectId(conversationId),
  }).sort({ createdAt: 1 });

  // If using cursor-based pagination
  if (query.cursor) {
    const cursorDate = new Date(query.cursor);
    baseQuery = baseQuery.where("createdAt").lt(cursorDate.getTime());
  }

  // Build query with QueryBuilder
  const messagesQuery = new QueryBuilder(baseQuery, query)
    .search(["text"]) // search in message text
    .sort() // sort by query.sort or default -createdAt
    .paginate() // page & limit
    .fields(); // select fields

  const messages = await messagesQuery.modelQuery
    .sort({ createdAt: 1 })
    .populate({
      path: "sender",
      select: "email role",
      populate: [
        {
          path: "learnerProfile",
          model: "LearnerProfile",
          select: "name profileImage",
        },
        {
          path: "mentorProfile",
          model: "MentorProfile",
          select: "name profileImage",
        },
      ],
    })
    .lean();

  // Optional: total count for pagination info
  const pagination = await messagesQuery.countTotal();

  return { conversation, messages, pagination };
};

/* -------------------------------------------------------------------------- */
/* Mark messages as read                                                       */
/* -------------------------------------------------------------------------- */

const markMessageAsRead = async ({
  messageId,
  userId,
}: {
  messageId: string;
  userId: string;
}) => {
  const message = await MessageModel.findById(messageId);

  if (!message) return null;

  // Sender cannot mark their own message as read
  if (message.sender.toString() === userId.toString()) {
    throw new AppError(httpStatus.FORBIDDEN, "Sender cannot mark as read");
  }

  if (message.isRead) return message;

  message.isRead = true;
  message.readAt = new Date();

  await message.save();
  return message;
};


/* -------------------------------------------------------------------------- */
/* Edit message                                                                */
/* -------------------------------------------------------------------------- */

export const editMessage = async (
  messageId: string,
  userId: string,
  { text, attachments }: { text?: string; attachments?: any[] }
) => {
  if (!messageId)
    throw new AppError(httpStatus.BAD_REQUEST, "messageId required");
  if (!userId)
    throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated");

  const msg = await MessageModel.findById(messageId);
  if (!msg) throw new AppError(httpStatus.NOT_FOUND, "Message not found");

  if (msg.sender.toString() !== userId.toString())
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Only the message sender can edit this message"
    );

  if (msg.isDeleted)
    throw new AppError(httpStatus.BAD_REQUEST, "Cannot edit a deleted message");

  if (typeof text !== "undefined") msg.text = text;
  if (Array.isArray(attachments)) msg.attachments = attachments;
  msg.editedAt = new Date();

  await msg.save();

  return MessageModel.findById(msg._id).populate({
    path: "sender",
    select: "email role",
    populate: [
      {
        path: "learnerProfile",
        model: "LearnerProfile",
        select: "name profileImage",
      },
      {
        path: "mentorProfile",
        model: "MentorProfile",
        select: "name profileImage",
      },
    ],
  });
};

/* -------------------------------------------------------------------------- */
/* Delete message (soft delete)                                                */
/* -------------------------------------------------------------------------- */

export const deleteMessage = async (
  messageId: string,
  userId: string,
  isAdmin = false
) => {
  if (!messageId)
    throw new AppError(httpStatus.BAD_REQUEST, "messageId required");
  if (!userId)
    throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated");

  const msg = await MessageModel.findById(messageId);
  if (!msg) throw new AppError(httpStatus.NOT_FOUND, "Message not found");

  if (!isAdmin && msg.sender.toString() !== userId.toString())
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Not authorized to delete this message"
    );

  msg.text = "[deleted]";
  msg.attachments = [];
  msg.isDeleted = true;
  msg.deletedAt = new Date();
  await msg.save();

  const conv = await ConversationModel.findById(msg.conversation);
  if (conv) {
    const last = await MessageModel.findOne({
      conversation: conv._id,
      _id: { $ne: msg._id },
      isDeleted: false,
    })
      .sort({ createdAt: -1 })
      .lean();

    conv.lastMessage =
      last?.text ?? (last?.attachments?.length ? "Attachment" : "");
    conv.lastMessageAt = last?.createdAt ?? conv.lastMessageAt;
    await conv.save();
  }

  return MessageModel.findById(msg._id).populate({
    path: "sender",
    select: "email role",
  });
};

/* -------------------------------------------------------------------------- */
/* Export                                                                     */
/* -------------------------------------------------------------------------- */

export const ChatService = {
  findConversationBetween,
  createOrGetConversation,
  listConversationsForUser,
  sendMessage,
  getMessages,
  markMessageAsRead,
  editMessage,
  deleteMessage,
};

export default ChatService;
