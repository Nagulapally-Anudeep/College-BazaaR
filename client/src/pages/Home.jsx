import React from "react";
import AccountMenu from "../components/AccountMenu";
import HomeContent from "../components/HomeContent";

const Home = () => {
  return (
    <>
      <AccountMenu />
      <HomeContent isFavs={false} />
    </>
  );
};

export default Home;
