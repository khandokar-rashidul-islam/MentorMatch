/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server as SocketIOServer, Socket as DefaultSocket } from "socket.io";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import config from "../../config";
import { UserModel } from "../user/user.model";
import { TUserRole } from "../user/user.constant";

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
  // Socket auth middleware
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

    // Add socket to the user's set
    if (!userSockets.has(userId)) userSockets.set(userId, new Set());
    const sockets = userSockets.get(userId);
    if (sockets) {
      sockets.add(socket.id);

      // Only broadcast "online" when first socket connects
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
    }

    // Listen for joining conversation rooms
    socket.on("joinRoom", (conversationId: string) => {
      socket.join(conversationId);
      console.log(`User ${userId} joined room ${conversationId}`);
    });

    // Typing indicator
    socket.on("typing", ({ conversationId }: { conversationId: string }) => {
      io.to(conversationId).emit("typing", { userId });
    });

    // Send message placeholder
    socket.on("sendMessage", async (data: any) => {
      // Implement your ChatService logic here
      io.to(data.conversationId).emit("new-message", data);
    });

    // Mark messages as read placeholder
    socket.on("markAsRead", async (data: { conversationId: string }) => {
      io.to(data.conversationId).emit("messages-read", { userId });
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id} (user: ${userId})`);

      const sockets = userSockets.get(userId);
      if (sockets) {
        sockets.delete(socket.id);

        if (sockets.size === 0) {
          // All sockets disconnected
          userSockets.delete(userId);
          io.emit("presence:update", {
            userId,
            isOnline: false,
            totalSockets: 0,
          });
          UserModel.findByIdAndUpdate(userId, { isOnline: false }).catch(
            console.error
          );
        } else {
          // Update totalSockets for other tabs
          io.emit("presence:update", {
            userId,
            isOnline: true,
            totalSockets: sockets.size,
          });
        }
      }
    });

    // Optional: send presence snapshot on request
    socket.on("presence:request", () => {
      const snapshot = Array.from(userSockets.entries()).map(
        ([uid, sockets]) => ({
          userId: uid,
          isOnline: sockets.size > 0,
          totalSockets: sockets.size,
        })
      );
      socket.emit("presence:bulk", snapshot);
    });
  });
};
