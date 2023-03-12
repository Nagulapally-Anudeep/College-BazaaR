import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountMenu from "../components/AccountMenu";
import { Box } from "@chakra-ui/react";
import MyChats from "../components/ChatComps/MyChats";
import ChatBox from "../components/ChatComps/ChatBox";
import { getMyChats } from "../actions/chat";

const Chats = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyChats());
  }, [dispatch]);

  return (
    <>
      <AccountMenu />
      <div style={{ width: "100%" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          w="98%"
          h="91.5vh"
          p="10px"
        >
          {user && <MyChats />}
          {user && <ChatBox />}
        </Box>
      </div>
    </>
  );
};

export default Chats;
