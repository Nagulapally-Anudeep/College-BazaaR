import { createSlice } from "@reduxjs/toolkit";

const initialMessageState = {
  messages: [],
  isLoading: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState: initialMessageState,
  reducers: {
    fetchMessages: (state, action) => {
      state.messages = action.payload?.data;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload?.data);
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    endLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const messageActions = messageSlice.actions;

export default messageSlice.reducer;
