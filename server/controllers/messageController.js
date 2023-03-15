const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");

exports.sendMessage = async (req, res, next) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res.status(200).json({
      message: "Invalid data passed into request",
    });
  }

  const newMessage = {
    sender: req.userId,
    content,
    chat: chatId,
  };

  try {
    const message = await Message.create(newMessage);

    let fullMessage = await Message.findOne({ _id: message._id })
      .populate("sender", "-password -postedItems -favouriteItems")
      .populate("chat");

    fullMessage = await User.populate(fullMessage, {
      path: "chat.users",
      select: "-password -postedItems -favouriteItems",
    });

    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message._id,
    });

    // console.log(fullMessage);

    res.status(200).json(fullMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMessages = async (req, res, next) => {
  const { chatId } = req.params;
  try {
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "-password -postedItems -favouriteItems")
      .populate("chat");

    res.status(200).json(messages);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
