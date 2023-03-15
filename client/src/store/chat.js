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
      //   state.selectedChat = null;
    },
    fetchSelectedChat: (state, action) => {
      state.selectedChat = action.payload?.data;
      if (!state.chats.find((c) => c._id === state.selectedChat._id)) {
        state.chats.push(action.payload?.data);
      }
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
