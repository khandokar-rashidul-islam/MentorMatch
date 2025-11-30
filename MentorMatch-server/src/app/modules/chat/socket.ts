/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */ /* eslint-disable no-unused-vars */
import { Server as SocketIOServer, Socket as DefaultSocket } from "socket.io";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import config from "../../config";
import { UserModel } from "../user/user.model";
import { TUserRole } from "../user/user.constant";
import { ConversationModel, MessageModel } from "./chat.model";

// Extend socket type
interface AuthenticatedSocket extends DefaultSocket {
  user: {
    userId: string;
    activeRole?: TUserRole;
    role?: TUserRole[];
  };
}

// Map to track all sockets per user
const userSockets: Map<string, Set<string>> = new Map();

export const initSocket = (io: SocketIOServer) => {
  // Middleware: authenticate socket via JWT in cookie
  io.use((socket: DefaultSocket, next) => {
    try {
      const cookies = cookie.parse(socket.handshake.headers.cookie || "");
      const token = cookies["accessToken"];
      if (!token) return next(new Error("Unauthorized: No token"));

      const decoded = jwt.verify(token, config.jwt_access_secret as string);
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
        return next();
      }

      next(new Error("Unauthorized: Invalid token payload"));
    } catch (err) {
      next(new Error("Unauthorized: Invalid token"));
    }
  });

  io.on("connection", (socket: DefaultSocket) => {
    const authSocket = socket as AuthenticatedSocket;
    const userId = authSocket.user.userId;

    console.log(`User connected: ${userId} (socket: ${socket.id})`);

    // Track sockets for this user
    if (!userSockets.has(userId)) userSockets.set(userId, new Set());
    const sockets = userSockets.get(userId)!;
    sockets.add(socket.id);

    // Only broadcast online if first socket connected
    if (sockets.size === 1) {
      io.emit("presence:update", {
        userId,
        isOnline: true,
        totalSockets: sockets.size,
      });
      UserModel.findByIdAndUpdate(userId, { isOnline: true }).catch(
        console.error
      );
    }

    /** ------------------- Rooms ------------------- **/
    socket.on("joinRoom", (conversationId: string) => {
      socket.join(conversationId);
      console.log(`User ${userId} joined room ${conversationId}`);
    });

    /** ------------------- Typing ------------------- **/
    socket.on("typing", ({ conversationId }: { conversationId: string }) => {
      io.to(conversationId).emit("typing", { conversationId, userId });
    });
    socket.on(
      "stop-typing",
      ({ conversationId }: { conversationId: string }) => {
        io.to(conversationId).emit("stop-typing", { conversationId, userId });
      }
    );

    /** ------------------- Messages ------------------- **/
    socket.on("sendMessage", async (data: any) => {
      // Acknowledge delivery to sender
      const { conversationId, message } = data;
      socket.to(conversationId).emit("message-delivered", {
        conversationId,
        messageId: message._id,
      });
      // Broadcast new message to room
      io.to(data.conversationId).emit("new-message", data);
    });

    //messages-read event
    socket.on("messages-read", ({ conversationId, readerId }) => {
      if (!conversationId || !readerId) return;

      // Notify only users in this conversation
      io.to(conversationId).emit("messages-read", {
        conversationId,
        readerId,
        timestamp: new Date(),
      });
    });


    /** ------------------- Presence ------------------- **/
    socket.on("presence:request", async () => {
      const snapshot = await Promise.all(
        Array.from(userSockets.entries()).map(async ([uid, sockets]) => {
          const user = await UserModel.findById(uid).lean();
          return {
            userId: uid,
            isOnline: sockets.size > 0,
            totalSockets: sockets.size,
            lastSeen: sockets.size === 0 ? user?.lastSeen : undefined,
          };
        })
      );

      socket.emit("presence:bulk", snapshot);
    });

    /** ------------------- Disconnect ------------------- **/
    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id} (user: ${userId})`);
      const sockets = userSockets.get(userId);
      if (!sockets) return;

      sockets.delete(socket.id);

      if (sockets.size === 0) {
        // All sockets disconnected → offline
        userSockets.delete(userId);
        const lastSeenTime = Date.now();
        io.emit("presence:update", {
          userId,
          isOnline: false,
          totalSockets: 0,
          lastSeen: lastSeenTime,
        });
        UserModel.findByIdAndUpdate(userId, {
          isOnline: false,
          lastSeen: lastSeenTime,
        }).catch(console.error);
      } else {
        // Still online on other tabs
        io.emit("presence:update", {
          userId,
          isOnline: true,
          totalSockets: sockets.size,
        });
      }
    });
  });
};
