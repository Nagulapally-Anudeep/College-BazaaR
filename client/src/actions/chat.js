import * as api from "../api";
import { chatActions } from "../store/chat";

export const getMyChats = () => async (dispatch) => {
  try {
    dispatch(chatActions.startLoading());
    const { data } = await api.getMyChats();
    // console.log(data);
    dispatch(chatActions.fetchMyChats({ data }));
    dispatch(chatActions.endLoading());
  } catch (err) {
    console.log(err);
  }
};

export const accessChat = (userId) => async (dispatch) => {
  try {
    dispatch(chatActions.startLoading());
    const { data } = await api.accessChat(userId);
    // console.log(data);
    dispatch(chatActions.fetchSelectedChat({ data }));
    dispatch(chatActions.endLoading());
  } catch (err) {
    console.log(err);
  }
};

export const selectChat = (chat) => async (dispatch) => {
  try {
    dispatch(chatActions.startLoading());
    dispatch(chatActions.fetchSelectedChat({ data: chat }));
    dispatch(chatActions.endLoading());
  } catch (err) {
    console.log(err);
  }
};
