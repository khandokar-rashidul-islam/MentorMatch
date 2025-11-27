// src/modules/chat/chat.route.ts

import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../user/user.constant";
import validateRequest from "../../middlewares/validateRequest";

import {
  createConversationValidation,
  sendMessageValidation,
  editMessageValidation,
  deleteMessageValidation,
  markAsReadValidation,
} from "./chat.validation";

import { ChatController } from "./chat.controller";
import { upload } from "../../utils/sendImageToCloudinary";

const router = express.Router();

/* -------------------------------------------------------------------------- */
/* Conversation Routes                                                        */
/* -------------------------------------------------------------------------- */

// Create or Get Conversation (Learner → Mentor)
router.post(
  "/conversation/start",
  auth(USER_ROLES.LEARNER),
  validateRequest(createConversationValidation),
  ChatController.createOrGetConversation
);

// Get My Conversations (Inbox)
router.get(
  "/conversation",
  auth(USER_ROLES.LEARNER, USER_ROLES.MENTOR),
  ChatController.getMyConversations
);

/* -------------------------------------------------------------------------- */
/* Message Routes                                                             */
/* -------------------------------------------------------------------------- */

// Send Message
router.post(
  "/message/send",
  auth(USER_ROLES.LEARNER, USER_ROLES.MENTOR),
  upload.array("attachments", 5), // up to 5 files
  // Parse JSON from body.data + attach uploaded files
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    if (req.files && Array.isArray(req.files)) {
      req.body.attachmentFiles = req.files; // pass files to controller
    }
    next();
  },
  validateRequest(sendMessageValidation),
  ChatController.sendMessage
);

// Get Messages of a Conversation
router.get(
  "/message/:conversationId",
  auth(USER_ROLES.LEARNER, USER_ROLES.MENTOR),
  ChatController.getMessages
);

// Mark Messages as Read
router.patch(
  "/messages/read",
  auth(USER_ROLES.LEARNER, USER_ROLES.MENTOR),
  validateRequest(markAsReadValidation),
  ChatController.markAsRead
);

// Edit Message
router.patch(
  "/message/edit/:messageId",
  auth(USER_ROLES.LEARNER, USER_ROLES.MENTOR),
  validateRequest(editMessageValidation),
  ChatController.editMessage
);

// Delete Message
router.delete(
  "/message/delete/:messageId",
  auth(USER_ROLES.LEARNER, USER_ROLES.MENTOR),
  validateRequest(deleteMessageValidation),
  ChatController.deleteMessage
);

export const ChatRoutes = router;

