const Chat = require("../models/chatModel");
const User = require("../models/userModel");

exports.accessChat = async (req, res, next) => {
  const { userId } = req.body;

  //   console.log(req.body);

  if (!userId) {
    return res
      .status(400)
      .json({ message: "UserId param not sent with request" });
  }

  let isChat = await Chat.find({
    $and: [
      { users: { $elemMatch: { $eq: req.userId } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password -postedItems -favouriteItems")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "-password -postedItems -favouriteItems",
  });

  if (isChat.length > 0) {
    res.status(200).json(isChat[0]);
  } else {
    let chatData = {
      chatName: "sender",
      users: [req.userId, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);

      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password -postedItems -favouriteItems"
      );

      res.status(200).json(fullChat);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};

exports.fetchChats = async (req, res, next) => {
  try {
    let allUserChats = await Chat.find({
      users: { $elemMatch: { $eq: req.userId } },
    })
      .populate("users", "-password -postedItems -favouriteItems")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    allUserChats = await User.populate(allUserChats, {
      path: "latestMessage.sender",
      select: "-password -postedItems -favouriteItems",
    });

    res.status(200).json(allUserChats);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
