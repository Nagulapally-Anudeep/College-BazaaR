import * as api from "../api";
import { messageActions } from "../store/message";

export const sendMessage = (content, chatId) => async (dispatch) => {
  try {
    const { data } = await api.sendMessage(content, chatId);
    // console.log(data);
    dispatch(messageActions.addMessage({ data }));
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchMessages = (chatId) => async (dispatch) => {
  try {
    dispatch(messageActions.startLoading());
    const { data } = await api.fetchMessages(chatId);
    // console.log(data);
    dispatch(messageActions.fetchMessages({ data }));
    dispatch(messageActions.endLoading());
  } catch (err) {}
};

export const addMessage = (newMessage) => async (dispatch) => {
  try {
    dispatch(messageActions.addMessage({ data: newMessage }));
  } catch (err) {
    console.log(err);
  }
};
