import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";
import SingleChat from "./SingleChat";

const ChatBox = () => {
  const { selectedChat } = useSelector((state) => state.chat);

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      //   display="flex"
      alignItems="center"
      flexDir="column"
      p="12px"
      bg="white"
      //   w={{ base: "100%", md: "68%" }}
      w="64%"
      borderRadius="10px"
      borderWidth="1px"
    >
      <SingleChat />
    </Box>
  );
};

export default ChatBox;
