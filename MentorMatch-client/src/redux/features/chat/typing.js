import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // conversationId -> { userId: true }
  typing: {},
};

const slice = createSlice({
  name: "typing",
  initialState,
  reducers: {
    setTyping(state, action) {
      const { conversationId, userId } = action.payload;
      if (!state.typing[conversationId]) state.typing[conversationId] = {};
      state.typing[conversationId][userId] = true;
    },
    stopTyping(state, action) {
      const { conversationId, userId } = action.payload;
      if (state.typing[conversationId]) {
        delete state.typing[conversationId][userId];
        if (Object.keys(state.typing[conversationId]).length === 0) {
          delete state.typing[conversationId];
        }
      }
    },
    clearTypingForConversation(state, action) {
      const conversationId = action.payload;
      if (state.typing[conversationId]) delete state.typing[conversationId];
    },
    clearAllTyping(state) {
      state.typing = {};
    },
  },
});

export const {
  setTyping,
  stopTyping,
  clearTypingForConversation,
  clearAllTyping,
} = slice.actions;
export default slice.reducer;
