import { io } from "socket.io-client";

let socket = null;
const MAX_RECONNECT_ATTEMPTS = 10;

export const connectSocket = (opts = {}) => {
  if (socket && socket.connected) return socket;

  const url = opts.url || "http://localhost:5000";

  socket = io(url, {
    withCredentials: true,
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: MAX_RECONNECT_ATTEMPTS,
    reconnectionDelay: 500,
    reconnectionDelayMax: 5000,
    timeout: 20000,
    auth: opts.token ? { token: opts.token } : undefined,
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);

    // Ask server to send fresh online/offline data
    socket.emit("presence:request");
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connect error:", err.message || err);
  });

  socket.on("disconnect", (reason) => {
    console.warn("Socket disconnected:", reason);
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = (opts = {}) => {
  if (!socket) return;

  if (opts.force) socket.disconnect();
  else socket.close();

  socket = null;
};
