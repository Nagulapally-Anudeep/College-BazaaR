import { createSlice } from "@reduxjs/toolkit";

const initialItemState = {
  items: [],
  currentPage: 1,
  numberOfPages: 1,
  item: null,
  isLoading: true,
};

const itemSlice = createSlice({
  name: "item",
  initialState: initialItemState,
  reducers: {
    fetchAll: (state, action) => {
      state.items = action.payload.data.items;
      state.currentPage = action.payload.data.page;
      state.numberOfPages = action.payload.data.numberOfPages;
    },
    fetchOne: (state, action) => {
      state.item = action.payload.data;
    },
    fetchSearchResults: (state, action) => {
      state.items = action.payload.data;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    endLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const itemActions = itemSlice.actions;

export default itemSlice.reducer;
