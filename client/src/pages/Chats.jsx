import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountMenu from "../components/AccountMenu";
import { Box, Text } from "@chakra-ui/react";
import MyChats from "../components/ChatComps/MyChats";
import ChatBox from "../components/ChatComps/ChatBox";
import { getMyChats } from "../actions/chat";

const Chats = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getMyChats());
    }
  }, [dispatch, user]);

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
          {!user && (
            <Text fontFamily="Work sans" fontSize="40px">
              Login to access the chat
            </Text>
          )}
        </Box>
      </div>
    </>
  );
};

export default Chats;
