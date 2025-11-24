import http from "http";
import app from "./app";
import config from "./app/config";

import mongoose from "mongoose";
import { seedSuperAdmin } from "./app/DB";

import { Server as SocketIOServer } from "socket.io";
import { initSocket } from "./app/modules/chat/socket";

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

    // Initialize socket logic
    initSocket(io);

    server.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
