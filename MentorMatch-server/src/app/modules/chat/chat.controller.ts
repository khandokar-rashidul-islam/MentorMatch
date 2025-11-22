/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AppError from "../../errors/AppError";
import { ChatService } from "./chat.service";

// ---------------------------
// Create or get conversation
// ---------------------------
export const createOrGetConversation = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const activeRole = req.user?.activeRole;

  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }

  const { mentorId, text } = req.body;

  if (!mentorId) {
    throw new AppError(httpStatus.BAD_REQUEST, "mentorId is required");
  }

  if (activeRole !== "learner") {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Only learner can start a conversation"
    );
  }

  const conversation = await ChatService.createOrGetConversation(
    userId,
    mentorId,
    text
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Conversation fetched or created successfully",
    data: conversation,
  });
});

// ---------------------------
// Inbox conversation list
// ---------------------------
export const getMyConversations = catchAsync(async (req, res) => {
  const userId = req.user?.id;

  if (!userId) throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized");

  const result = await ChatService.listConversationsForUser(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Conversations retrieved successfully",
    data: result,
  });
});

// ---------------------------
// Send message
// ---------------------------
export const sendMessage = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const activeRole = req.user?.activeRole;

  if (!userId) throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized");

  if (!activeRole || (activeRole !== "learner" && activeRole !== "mentor")) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid sender role");
  }

  const payload = {
    conversationId: req.body.conversationId,
    senderId: userId,
    senderRole: activeRole as "learner" | "mentor",
    mentorId: req.body.mentorId,
    text: req.body.text,
    attachments: req.body.attachments,
    customOrder: req.body.customOrder,
  };

  const { message, conversation } = await ChatService.sendMessage(payload);

  // Emit socket event
  const io = req.app.get("io");
  io.to(conversation._id.toString()).emit("new-message", message);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Message sent successfully",
    data: { message, conversationId: conversation._id },
  });
});

// ---------------------------
// Get messages
// ---------------------------
export const getMessages = catchAsync(async (req, res) => {
  const { conversationId } = req.params;

  if (!conversationId)
    throw new AppError(httpStatus.BAD_REQUEST, "conversationId missing");

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 50;

  // Optionally, support search term and fields for messages
  const query: Record<string, any> = {
    searchTerm: req.query.searchTerm,
    page,
    limit,
    fields: req.query.fields,
    sort: req.query.sort,
  };

  const result = await ChatService.getMessages(conversationId, query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Messages fetched successfully",
    data: result,
  });
});

// ---------------------------
// Mark messages as read
// ---------------------------
export const markAsRead = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const { conversationId } = req.body;

  if (!userId) throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized");

  await ChatService.markMessagesAsRead(conversationId, userId);

  // Emit socket read event
  const io = req.app.get("io");
  io.to(conversationId).emit("messages-read", { userId });

  sendResponse(res,{
    success: true,
    statusCode: httpStatus.OK,
    message: "Messages marked as read",
    data: null,
  });
});

// ---------------------------
// Edit message
// ---------------------------
export const editMessage = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const { messageId } = req.params;

  if (!userId) throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized");

  const updated = await ChatService.editMessage(messageId, userId, {
    text: req.body.text,
    attachments: req.body.attachments,
  });

  if (!updated) {
    throw new AppError(httpStatus.NOT_FOUND, "Message not found");
  }
  // Emit socket edit event
    const io = req.app.get("io");
    io.to(updated.conversation.toString()).emit("message-edited", updated);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Message edited successfully",
    data: updated,
  });
});

// ---------------------------
// Delete message (Soft Delete)
// ---------------------------
export const deleteMessage = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const { messageId } = req.params;

  if (!userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }

  // Service handles: check if message.senderId === userId
  const deleted = await ChatService.deleteMessage(messageId, userId);

  if (!deleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Message not found");
  }

  // Emit socket delete event
  const io = req.app.get("io");
  io.to(deleted.conversation.toString()).emit("message-deleted", deleted);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Message deleted successfully",
    data: deleted,
  });
});

// ---------------------------
// Export
// ---------------------------
export const ChatController = {
  createOrGetConversation,
  getMyConversations,
  sendMessage,
  getMessages,
  markAsRead,
  editMessage,
  deleteMessage,
};

export default ChatController;
