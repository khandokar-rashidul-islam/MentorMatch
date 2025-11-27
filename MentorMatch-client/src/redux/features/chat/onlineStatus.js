import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  online: {}, // { userId: { isOnline: boolean, totalSockets: number } }
  lastSeen: {}, // { userId: timestamp }
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
        // mark online
        state.online[userId] = { isOnline: true, totalSockets };
        // remove any stale lastSeen when user comes online
        if (state.lastSeen[userId]) delete state.lastSeen[userId];
      } else {
        // remove from online
        delete state.online[userId];
        // save lastSeen timestamp, fallback to current time if not provided
        state.lastSeen[userId] =
          typeof lastSeen === "number" ? lastSeen : Date.now();
      }
    },

    bulkSetPresence: (state, action) => {
      // action.payload = [{ userId, isOnline, totalSockets, lastSeen }, ...]
      action.payload.forEach(
        ({ userId, isOnline, totalSockets = isOnline ? 1 : 0, lastSeen }) => {
          if (isOnline) {
            state.online[userId] = { isOnline: true, totalSockets };
            if (state.lastSeen[userId]) delete state.lastSeen[userId];
          } else {
            delete state.online[userId];
            state.lastSeen[userId] =
              typeof lastSeen === "number" ? lastSeen : Date.now();
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
