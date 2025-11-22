import { Schema, model } from "mongoose";
import {
  IConversation,
  IMessage,
  IMessageAttachment,
  ICustomOrder,
} from "./chat.interface";

/* ============================================================
   ATTACHMENT SCHEMA
   ============================================================ */
const messageAttachmentSchema = new Schema<IMessageAttachment>(
  {
    url: { type: String, required: true },
    name: { type: String },
    mimeType: { type: String },
    size: { type: Number },
    type: { type: String, enum: ["image", "file"], default: "file" },
  },
  { _id: false }
);

/* ============================================================
   CUSTOM ORDER SCHEMA
   ============================================================ */
const customOrderSchema = new Schema<ICustomOrder>(
  {
    price: { type: Number, required: true },
    requirements: { type: String, required: true },
    deliveryTime: { type: Number, required: true },
    isOrderAccepted: { type: Boolean, default: false },
  },
  { timestamps: true, _id: false }
);

/* ============================================================
   CONVERSATION SCHEMA
   ============================================================ */
const conversationSchema = new Schema<IConversation>(
  {
    learnerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    mentorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    lastMessage: { type: String },
    lastMessageAt: { type: Date },
  },
  { timestamps: true }
);

// Ensure unique conversation between learner & mentor
conversationSchema.index({ learnerId: 1, mentorId: 1 }, { unique: true });

export const ConversationModel = model<IConversation>(
  "Conversation",
  conversationSchema
);

/* ============================================================
   MESSAGE SCHEMA
   ============================================================ */
const messageSchema = new Schema<IMessage>(
  {
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },

    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    senderRole: {
      type: String,
      enum: ["learner", "mentor"],
      required: true,
    },

    // Main content
    text: { type: String },
    attachments: [messageAttachmentSchema],

    customOrder: customOrderSchema,

    isRead: { type: Boolean, default: false },

    // Edit / delete controls
    editedAt: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// Sort messages efficiently
messageSchema.index({ conversation: 1, createdAt: 1 });
messageSchema.index({ sender: 1 });

// Export
export const MessageModel = model<IMessage>("Message", messageSchema);
