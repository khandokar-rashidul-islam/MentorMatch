/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "http";
import app from './app';
import config from './app/config';

import mongoose from 'mongoose';
import { seedSuperAdmin } from './app/DB';

import { Server as SocketIOServer } from "socket.io";
import { ChatService } from "./app/modules/chat/chat.service";
import { IMessageAttachment } from "./app/modules/chat/chat.interface";



async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    // super admin
    await seedSuperAdmin();

    const server = http.createServer(app);

    // Socket.io setup
    const io = new SocketIOServer(server, {
      cors: {
        origin: ["http://localhost:5173"], // front-end origin
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

     // Make io accessible via app instance
     app.set("io", io);
     
    // Socket.io connection
    io.on("connection", (socket) => {
      console.log("A user connected", socket.id);

      // Join user to a conversation room
      socket.on("joinRoom", (conversationId: string) => {
        socket.join(conversationId);
        console.log(`Socket ${socket.id} joined room ${conversationId}`);
      });

      // Typing indicator
      socket.on(
        "typing",
        (data: { conversationId: string; userId: string }) => {
          socket
            .to(data.conversationId)
            .emit("typing", { userId: data.userId });
        }
      );

      // Send message
      socket.on(
        "sendMessage",
        async (data: {
          conversationId?: string;
          senderId: string;
          senderRole: "learner" | "mentor";
          mentorId?: string;
          text?: string;
          attachments?: IMessageAttachment[];
        }) => {
          try {
            const { message, conversation } =
              await ChatService.sendMessage(data);
            io.to(conversation._id.toString()).emit("new-message", message);
          } catch (err: any) {
            socket.emit("error", { message: err.message });
          }
        }
      );

      // Mark messages read
      socket.on(
        "markAsRead",
        async (data: { conversationId: string; userId: string }) => {
          try {
            await ChatService.markMessagesAsRead(
              data.conversationId,
              data.userId
            );
            io.to(data.conversationId).emit("messagesRead", {
              userId: data.userId,
            });
          } catch (err:any) {
            socket.emit("error", { message: err.message });
          }
        }
      );

      socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
      });
    });

    server.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
    
  } catch (err) {
    console.log(err);
  }
}

main();
