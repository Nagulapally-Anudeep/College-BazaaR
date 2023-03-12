import React from "react";
import AccountMenu from "../components/AccountMenu";
import HomeContent from "../components/HomeContent";

const Favourites = () => {
  return (
    <>
      <AccountMenu />
      <HomeContent isFavs={true} />
    </>
  );
};

export default Favourites;
