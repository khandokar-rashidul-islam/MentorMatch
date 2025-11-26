import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  online: {}, // { userId: { isOnline, totalSockets } }
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
      } = action.payload;
      if (isOnline) {
        state.online[userId] = { isOnline, totalSockets };
      } else {
        delete state.online[userId];
      }
    },
    bulkSetPresence: (state, action) => {
      action.payload.forEach(
        ({ userId, isOnline, totalSockets = isOnline ? 1 : 0 }) => {
          if (isOnline) state.online[userId] = { isOnline, totalSockets };
          else delete state.online[userId];
        }
      );
    },
    clearPresence: (state) => {
      state.online = {};
    },
  },
});

export const { setPresence, bulkSetPresence, clearPresence } = slice.actions;
export default slice.reducer;
