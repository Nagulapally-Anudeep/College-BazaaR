import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectChat } from "../../actions/chat";
import { getSender } from "../../config/ChatLogics";

const ChatItem = ({ chat }) => {
  const { selectedChat } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSelectChat = () => {
    dispatch(selectChat(chat));
  };

  return (
    <Box
      onClick={handleSelectChat}
      cursor="pointer"
      bg={selectedChat && selectedChat._id === chat._id ? "#353d55" : "#E8E8E8"}
      color={selectedChat && selectedChat._id === chat._id ? "white" : "black"}
      px="12px"
      py="8px"
      borderRadius="10px"
    >
      <Text>{getSender(user, chat.users)}</Text>
    </Box>
  );
};

export default ChatItem;
