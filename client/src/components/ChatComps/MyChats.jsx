import React from "react";
import { useSelector } from "react-redux";
import { Box, Stack, Text } from "@chakra-ui/react";
import ChatLoading from "./ChatLoading";
import ChatItem from "./ChatItem";

const MyChats = () => {
  const { chats, selectedChat } = useSelector((state) => state.chat);

  return (
    <Box
      //   display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      display="flex"
      flexDir="column"
      alignItems="center"
      p="12px"
      bg="white"
      //   w={{ base: "100%", md: "31%" }}
      w="31%"
      borderRadius="10px"
      borderWidth="1px"
    >
      <Box
        pb="12px"
        px="12px"
        // fontSize={{ base: "28px", md: "30px" }}
        fontSize="28px"
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="10px"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll" py="12px" px="12px">
            {chats.length === 0 && (
              <Text fontFamily="Work sans">No chats yet</Text>
            )}
            {chats.map((chat) => (
              <ChatItem key={chat._id} chat={chat} />
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
