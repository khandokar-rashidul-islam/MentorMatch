import { Types } from "mongoose";

// ------------------------------
// Attachment (files / images)
// ------------------------------
export interface IMessageAttachment {
  url: string;
  name?: string;
  mimeType?: string;
  size?: number;
  type?: "image" | "file";
}

// ------------------------------
// Custom Order
// ------------------------------
export interface ICustomOrder {
  price: number;
  requirements: string;
  deliveryTime: number; // days
  isOrderAccepted: boolean;
}

// ------------------------------
// Conversation
// ------------------------------
export interface IConversation {
  _id?: Types.ObjectId;
  learnerId: Types.ObjectId;
  mentorId: Types.ObjectId;
  lastMessage?: string;
  lastMessageAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// ------------------------------
// Message
// ------------------------------
export interface IMessage {
  _id?: Types.ObjectId;

  conversation: Types.ObjectId;
  sender: Types.ObjectId;
  senderRole: "learner" | "mentor";

  text?: string;
  attachments?: IMessageAttachment[];

  customOrder?: ICustomOrder;

  isRead: boolean;

  // Editing / Deleting
  editedAt?: Date | null;
  isDeleted: boolean;
  deletedAt?: Date | null;

  createdAt?: Date;
  updatedAt?: Date;
}
