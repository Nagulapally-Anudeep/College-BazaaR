import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const signUp = (formData) => API.post("/api/users/signup", formData);
export const signIn = (formData) => API.post("/api/users/signin", formData);
export const googleAuth = (formData) =>
  API.post("/api/users/google-auth", formData);

export const getAllItems = (page) => API.get(`/api/items?page=${page}`);
export const getItem = (itemId) => API.get(`/api/items/${itemId}`);

export const createItem = (item) => API.post("/api/items", item);

export const updateItem = (itemId, item) =>
  API.patch(`/api/items/${itemId}`, item);

export const deleteItem = (itemId) => API.delete(`/api/items/${itemId}`);

export const updateFavItems = (itemId) => API.patch(`/api/users/fav/${itemId}`);

export const getItemsBySearch = (query) =>
  API.get(`/api/items/search?searchQuery=${query}`);

export const getMyChats = () => API.get("/api/chats/");
