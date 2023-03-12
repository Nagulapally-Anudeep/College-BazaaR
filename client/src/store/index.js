import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import itemReducer from "./items";
import chatReducer from "./chat";

const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemReducer,
    chat: chatReducer,
  },
});

export default store;
