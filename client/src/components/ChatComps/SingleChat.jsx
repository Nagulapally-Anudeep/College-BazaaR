import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { getSender } from "../../config/ChatLogics";
import { FormControl, OutlinedInput } from "@mui/material";
import { addMessage, fetchMessages, sendMessage } from "../../actions/messages";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import Lottie from "react-lottie";
import animationData from "../../animations/typing.json";
import "./styles.css";

const ENDPOINT = "https://anudeep-nagulapally-college-bazaar.up.railway.app/";
var socket, selectedChatCompare;

const SingleChat = () => {
  const { selectedChat } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);

  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const dispatch = useDispatch();

  const { messages, isLoading } = useSelector((state) => state.message);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    renderSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, [user]);

  useEffect(() => {
    if (selectedChat) {
      dispatch(fetchMessages(selectedChat._id));
      socket.emit("join chat", selectedChat._id);
      selectedChatCompare = selectedChat;
    }
  }, [selectedChat, dispatch]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // give notification
      } else {
        dispatch(addMessage(newMessageReceived));
        // console.log("added...");
      }
    });
  }, [dispatch]);

  const clickSendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      const data = await dispatch(sendMessage(newMessage, selectedChat._id));
      // console.log(data);
      setNewMessage("");
      socket.emit("new message", data);
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    // typing indicator logic
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    const lastTypingTime = new Date().getTime();
    const timerLength = 3000;

    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize="30px"
            pb="12px"
            px="8px"
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {getSender(user, selectedChat.users)}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p="12px"
            bg="#E8E8E8"
            w="97.5%"
            h="90%"
            borderRadius="10px"
            overflowY="hidden"
          >
            {isLoading ? (
              <Spinner
                size="xl"
                w="50px"
                h="50px"
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl onKeyDown={clickSendMessage} required mt="20px">
              {isTyping && (
                <div>
                  <Lottie
                    options={defaultOptions}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              )}
              <OutlinedInput
                placeholder="Enter a message.."
                sx={{ height: "38px", backgroundColor: "#E0E0E0" }}
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="30px" fontFamily="Work sans" pb="12px">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
