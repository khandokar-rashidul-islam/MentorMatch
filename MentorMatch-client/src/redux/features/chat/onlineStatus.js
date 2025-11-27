import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  online: {}, 
  lastSeen: {}, 
};

const slice = createSlice({
  name: "presence",
  initialState,
  reducers: {
    setPresence: (state, action) => {
      const {
        userId,
        isOnline,
        totalSockets = isOnline ? 1 : 0,
        lastSeen,
      } = action.payload;
      if (isOnline) {
        state.online[userId] = { isOnline: true, totalSockets };
        // remove stale lastSeen when online
        if (state.lastSeen && state.lastSeen[userId])
          delete state.lastSeen[userId];
      } else {
        // remove from online and store lastSeen if provided (or timestamp now)
        delete state.online[userId];
        state.lastSeen[userId] = lastSeen ?? Date.now();
      }
    },
    bulkSetPresence: (state, action) => {
      // action.payload = [{ userId, isOnline, totalSockets, lastSeen }, ...]
      action.payload.forEach(
        ({ userId, isOnline, totalSockets = isOnline ? 1 : 0, lastSeen }) => {
          if (isOnline) {
            state.online[userId] = { isOnline: true, totalSockets };
            if (state.lastSeen && state.lastSeen[userId])
              delete state.lastSeen[userId];
          } else {
            delete state.online[userId];
            state.lastSeen[userId] = lastSeen ?? Date.now();
          }
        }
      );
    },
    clearPresence: (state) => {
      state.online = {};
      state.lastSeen = {};
    },
  },
});

export const { setPresence, bulkSetPresence, clearPresence } = slice.actions;
export default slice.reducer;
