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
