// socket.ts - Single shared socket instance

import { io, Socket } from "socket.io-client";

let socket = null;

export const connectSocket = (token) => {
  if (!socket) {
    socket = io("http://localhost:5000", {
      withCredentials: true,
      auth: {
        token,
      },
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
