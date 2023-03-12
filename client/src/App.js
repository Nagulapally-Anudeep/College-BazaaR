import { useEffect } from "react";
import Home from "./pages/Home";
import Item from "./pages/Item";
import Favourites from "./pages/Favourites";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchItems from "./pages/SearchItems";
import Chats from "./pages/Chats";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("profile"));
    if (userData) {
      dispatch(
        authActions.authenticate({ data: userData, token: userData.token })
      );
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="items">
          <Route path=":itemId" element={<Item />} />
          <Route path="search" element={<SearchItems />} />
        </Route>
        <Route path="favourites" element={<Favourites />} />
        <Route path="profile/:userID" element={<Profile />} />
        <Route path="chat" element={<Chats />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
