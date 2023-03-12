const { createError } = require("../error");
const Item = require("../models/itemModel");
const User = require("../models/userModel");

exports.getUsersForChat = async (req, res, next) => {
  const { search } = req.query;

  const findFilter = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(findFilter).find({ _id: { $ne: req.userId } });

  res.status(200).json(users);
};

exports.getUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    user.password = undefined;

    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: "User not found!" });
  }
};

exports.updateFavItems = async (req, res, next) => {
  const { itemId } = req.params;

  try {
    const itemClicked = await Item.findById(itemId);

    if (!itemClicked) return next(createError(404, "Item not found!"));

    const user = await User.findById(req.userId);
    const userFavList = user.favouriteItems.map((item) => String(item._id));
    // console.log(userFavList);

    if (userFavList.includes(itemId)) {
      // console.log("is there");
      await User.findByIdAndUpdate(req.userId, {
        $pull: { favouriteItems: itemId },
      });

      // const index = userFavList.indexOf(itemId);
      // userFavList.splice(index, 1);
    } else {
      // console.log("is not there");

      await User.findByIdAndUpdate(req.userId, {
        $push: { favouriteItems: itemId },
      });

      // userFavList.push(itemId);
    }

    const updatedUser = await User.findById(req.userId);

    res.status(200).json({
      message: "Updated favourite Items!",
      data: updatedUser.favouriteItems,
    });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
