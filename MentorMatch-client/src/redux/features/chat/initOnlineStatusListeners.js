import { setPresence, bulkSetPresence } from "./onlineStatus";
import { getSocket } from "./socket";

export const initOnlineStatusListeners = (dispatch) => {
  const socket = getSocket();
  if (!socket) return;

  const onPresence = (payload) => {
    dispatch(setPresence(payload));
  };

  const onPresenceBulk = (payloadArray) => {
    dispatch(bulkSetPresence(payloadArray));
  };

  socket.on("presence:update", onPresence);
  socket.on("presence:bulk", onPresenceBulk);

  // request initial presence snapshot
  socket.emit("presence:request");

  return () => {
    socket.off("presence:update", onPresence);
    socket.off("presence:bulk", onPresenceBulk);
  };
};
