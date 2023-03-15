import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import itemReducer from "./items";
import chatReducer from "./chat";
import messageReducer from "./message";

const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemReducer,
    chat: chatReducer,
    message: messageReducer,
  },
});

export default store;
