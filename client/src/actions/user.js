import * as api from "../api";
import { authActions } from "../store/auth";

export const updateFavItems = (itemId) => async (dispatch) => {
  try {
    const { data } = await api.updateFavItems(itemId);
    dispatch(authActions.setFavItems({ data: data.data }));
    // console.log(res);
  } catch (err) {
    console.log(err);
  }
};
