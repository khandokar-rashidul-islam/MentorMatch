/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server as SocketIOServer, Socket as DefaultSocket } from "socket.io";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import config from "../../config";
import { IMessageAttachment } from "./chat.interface";
import ChatService from "./chat.service";
import { TUserRole } from "../user/user.constant";
import { UserModel } from "../user/user.model";

// Extend socket type
interface AuthenticatedSocket extends DefaultSocket {
  user: {
    userId: string;
    activeRole?: TUserRole;
    role?: TUserRole[];
  };
}

export const initSocket = (io: SocketIOServer) => {
  // Middleware to authenticate socket connections
  io.use((socket: DefaultSocket, next) => {
    try {
      const cookies = cookie.parse(socket.handshake.headers.cookie || "");
      const token = cookies["accessToken"]; // cookie name

      if (!token) {
        return next(new Error("Unauthorized: No token"));
      }

      const decoded = jwt.verify(token, config.jwt_access_secret as string);

      // Validate decoded is an object and has userId
      if (
        typeof decoded === "object" &&
        decoded !== null &&
        "userId" in decoded
      ) {
        (socket as AuthenticatedSocket).user = decoded as {
          userId: string;
          activeRole?: TUserRole;
          role?: TUserRole[];
        };
        next();
      } else {
        next(new Error("Unauthorized: Invalid token payload"));
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    } catch (err) {
      next(new Error("Unauthorized: Invalid token"));
    }
  });

  // Socket.io connection handler
  io.on("connection", (socket: DefaultSocket) => {
    const authSocket = socket as AuthenticatedSocket;

    console.log(
      `User connected: ${authSocket.user.userId} (socket: ${socket.id})`
    );


    const userId = socket.handshake.auth.userId;

    // Mark user online
    UserModel.findByIdAndUpdate(userId, { isOnline: true });
    io.emit("userOnline", { userId });

    socket.on("disconnect", async () => {
      await UserModel.findByIdAndUpdate(userId, { isOnline: false });
      io.emit("userOffline", { userId });
    });

    // Join conversation room 
    socket.on("joinRoom", (conversationId: string) => {
      socket.join(conversationId);
      console.log(
        `User ${authSocket.user.userId} joined room ${conversationId}`
      );
    });

    // Typing indicator 
    socket.on("typing", (data: { conversationId: string }) => {
      io.to(data.conversationId).emit("typing", {
        userId: authSocket.user.userId,
      });
    });

    // Send message 
    socket.on(
      "sendMessage",
      async (data: {
        conversationId?: string;
        mentorId?: string;
        text?: string;
        attachments?: IMessageAttachment[];
      }) => {
        try {
          const payload = {
            ...data,
            senderId: authSocket.user.userId,
            senderRole: authSocket.user.activeRole as "learner" | "mentor",
          };

          const { message, conversation } =
            await ChatService.sendMessage(payload);

          io.to(conversation._id.toString()).emit("new-message", message);
        } catch (err: any) {
          socket.emit("error", { message: err.message });
        }
      }
    );

    // Mark messages as read 
    socket.on("markAsRead", async (data: { conversationId: string }) => {
      try {
        await ChatService.markMessagesAsRead(
          data.conversationId,
          authSocket.user.userId
        );

        io.to(data.conversationId).emit("messagesRead", {
          userId: authSocket.user.userId,
        });
      } catch (err: any) {
        socket.emit("error", { message: err.message });
      }
    });

    socket.on("disconnect", () => {
      console.log(
        `User disconnected: ${authSocket.user?.userId} (socket: ${socket.id})`
      );
    });
  });
};
