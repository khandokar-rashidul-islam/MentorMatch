import { io, Socket } from "socket.io-client";

let socket = null;

export const connectSocket = () => {
  if (!socket) {
    socket = io("http://localhost:5000", {
      withCredentials: true,
      transports: ["websocket"], // Ensure WebSocket transport
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection failed:", err.message);
    });
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
