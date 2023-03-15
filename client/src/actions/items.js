import * as api from "../api/index";
import { itemActions } from "../store/items";

export const getItems = (page) => async (dispatch) => {
  try {
    dispatch(itemActions.startLoading());
    const { data } = await api.getAllItems(page);

    dispatch(itemActions.fetchAll({ data: data.data }));
    dispatch(itemActions.endLoading());
  } catch (err) {
    console.log(err.message);
  }
};

export const getItem = (itemId) => async (dispatch) => {
  try {
    dispatch(itemActions.startLoading());
    const { data } = await api.getItem(itemId);
    dispatch(itemActions.fetchOne({ data }));
    // console.log(data);
    dispatch(itemActions.endLoading());
  } catch (err) {
    console.log(err);
  }
};

export const getItemsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch(itemActions.startLoading());

    const { data } = await api.getItemsBySearch(searchQuery);
    // console.log(data);
    dispatch(itemActions.fetchSearchResults({ data: data.data }));
    dispatch(itemActions.endLoading());
  } catch (err) {
    console.log(err);
  }
};

export const createItem = (item, navigate) => async (dispatch) => {
  try {
    const { data } = await api.createItem(item);
    // console.log(data);
    navigate(`/items/${data._id}`);
  } catch (err) {
    console.log(err);
  }
};

export const updateItem = (itemId, item) => async (dispatch) => {
  try {
    dispatch(itemActions.startLoading());
    const { data } = await api.updateItem(itemId, item);
    // console.log(data);
    dispatch(itemActions.fetchOne({ data }));
    dispatch(itemActions.endLoading());
  } catch (err) {
    console.log(err);
  }
};

export const deleteItem = (itemId, navigate) => async (dispatch) => {
  try {
    await api.deleteItem(itemId);
    navigate("/");
  } catch (err) {
    console.log(err);
  }
};
