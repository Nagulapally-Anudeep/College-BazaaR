import { createSlice } from "@reduxjs/toolkit";

const initialChatsState = {
  chats: [],
  isLoading: false,
  selectedChat: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState: initialChatsState,
  reducers: {
    fetchMyChats: (state, action) => {
      state.chats = action.payload?.data;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    endLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const chatActions = chatSlice.actions;

export default chatSlice.reducer;
