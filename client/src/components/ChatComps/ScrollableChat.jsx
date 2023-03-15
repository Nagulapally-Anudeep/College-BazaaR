import React from "react";
import { Tooltip } from "@chakra-ui/react";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";
import {
  checkAvatarSender,
  messageMargin,
  isSameUser,
} from "../../config/ChatLogics";

const ScrollableChat = ({ messages }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {checkAvatarSender(messages, m, i, user._id) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  //   mt="7px"
                  //   mr="3px"
                  //   size="sm"
                  sx={{ width: 30, height: 30, mt: "7px", mr: "3px" }}
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.profilePic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: messageMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 9,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginBottom: `${i === messages.length - 1 ? "3px" : "0px"}`,
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
