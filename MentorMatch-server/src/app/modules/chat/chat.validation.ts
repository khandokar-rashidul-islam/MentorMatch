import { z } from "zod";

// Create or Get Conversation
export const createConversationValidation = z.object({
  body: z.object({
    mentorId: z.string({ required_error: "mentorId is required" }),
    text: z.string().optional(),
  }),
});

// Send Message
export const sendMessageValidation = z.object({
  body: z.object({
    conversationId: z.string().optional(),
    mentorId: z.string().optional(),
    text: z.string().optional(),
    attachments: z
      .array(
        z.object({
          url: z.string().url(),
          name: z.string(),
          mimeType: z.string(),
          size: z.number(),
          type: z.enum(["image","file"]),
        })
      )
      .optional(),
    customOrder: z.any().optional(),
  }),
});

// Mark As Read
export const markAsReadValidation = z.object({
  body: z.object({
    conversationId: z.string({
      required_error: "conversationId is required",
    }),
  }),
});

// Edit Message
export const editMessageValidation = z.object({
  body: z.object({
    text: z.string().optional(),
    attachments: z.array(z.any()).optional(),
  }),
  params: z.object({
    messageId: z.string({ required_error: "messageId required" }),
  }),
});

// Delete Message
export const deleteMessageValidation = z.object({
  params: z.object({
    messageId: z.string({ required_error: "messageId required" }),
  }),
});

export const ChatValidation = {
  createConversationValidation,
  sendMessageValidation,
  markAsReadValidation,
  editMessageValidation,
  deleteMessageValidation,
};

export default ChatValidation;
