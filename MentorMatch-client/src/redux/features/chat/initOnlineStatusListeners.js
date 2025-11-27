import { setPresence, bulkSetPresence } from "./onlineStatus";
import { setTyping, stopTyping } from "./typing";
import { getSocket } from "./socket";

// Note: dispatch is passed from your App/Chat initializer
export const initOnlineStatusListeners = (dispatch) => {
  const socket = getSocket();
  if (!socket) return;

  const onPresence = (payload) => dispatch(setPresence(payload));
  const onPresenceBulk = (payloadArr) => dispatch(bulkSetPresence(payloadArr));

  // typing events useful globally too
  const onTyping = (payload) => {
    // payload: { conversationId, userId }
    dispatch(setTyping(payload));
  };
  const onStopTyping = (payload) => {
    dispatch(stopTyping(payload));
  };

  socket.on("presence:update", onPresence);
  socket.on("presence:bulk", onPresenceBulk);

  socket.on("typing", onTyping);
  socket.on("stop-typing", onStopTyping);

  // request initial snapshot
  socket.emit("presence:request");

  return () => {
    socket.off("presence:update", onPresence);
    socket.off("presence:bulk", onPresenceBulk);
    socket.off("typing", onTyping);
    socket.off("stop-typing", onStopTyping);
  };
};
