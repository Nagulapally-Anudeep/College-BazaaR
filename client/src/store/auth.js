import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  user: null,
  error: null,
  favItems: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    authenticate: (state, action) => {
      localStorage.setItem(
        "profile",
        JSON.stringify({
          ...action.payload?.data,
          token: action.payload?.token,
        })
      );
      state.user = action.payload?.data;
      state.error = null;
      state.favItems = action.payload?.data.favouriteItems;
      // console.log("slice", state.favItems);
    },
    logout: (state) => {
      localStorage.clear();
      state.user = null;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload?.data;
    },
    clearError: (state) => {
      state.error = null;
    },
    setFavItems: (state, action) => {
      state.favItems = action.payload?.data;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
