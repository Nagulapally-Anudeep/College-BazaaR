const { createError } = require("../error");
const Item = require("../models/itemModel");
const User = require("../models/userModel");

exports.getAllItems = async (req, res, next) => {
  let { page, pageSize } = req.query;

  try {
    page = parseInt(page, 10) || 1;
    pageSize = parseInt(pageSize, 10) || 9;

    const items = await Item.aggregate([
      {
        $facet: {
          metadata: [{ $count: "totalCount" }],
          data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
        },
      },
      {
        $lookup: {
          from: "users",
          as: "sellerInfo",
          localField: "_id",
          foreignField: "seller",
        },
      },
    ]);

    // console.log(items[0]);

    const { data: itemInfo, sellerInfo } = items[0];
    // console.log(itemInfo, sellerInfo);

    itemInfo.forEach((x) => {
      const particularSeller = sellerInfo.filter((eachSeller) => {
        return String(eachSeller._id) === String(x.seller);
      });
      x.seller = particularSeller[0];
    });

    const totalCount = items[0].metadata[0].totalCount;

    res.status(200).json({
      data: {
        totalCount,
        page,
        pageSize,
        numberOfPages: Math.ceil(totalCount / pageSize),
        items: itemInfo,
      },
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

exports.getItemsBySearch = async (req, res, next) => {
  const { searchQuery } = req.query;
  // console.log(searchQuery);
  try {
    const regExpQuery = new RegExp(searchQuery, "i");

    const items = await Item.find({
      $or: [
        { title: { $regex: regExpQuery } },
        { description: { $regex: regExpQuery } },
      ],
    });

    res.json({ data: items });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.getItem = async (req, res, next) => {
  const { itemId } = req.params;
  try {
    const item = await Item.findById(itemId);

    res.status(200).json(item);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.createItem = async (req, res, next) => {
  const item = req.body;

  const newItem = new Item({
    ...item,
    seller: req.userId,
  });

  try {
    await newItem.save();

    const currentUser = await User.findById(req.userId);
    postedItemIds = currentUser.postedItems;
    postedItemIds.push(newItem._id);

    await User.findByIdAndUpdate(req.userId, { postedItems: postedItemIds });

    const newItemData = await Item.findById(newItem._id);

    res.status(201).json(newItemData);
  } catch (err) {
    res.status(409).json({
      message: err.message,
    });
  }
};

exports.updateItem = async (req, res, next) => {
  const { itemId: _id } = req.params;
  const updateDetails = req.body;

  try {
    const currentItem = await Item.findById(_id);

    if (!currentItem) return next(createError(404, "Item not found!"));

    if (String(currentItem.seller._id) !== String(req.userId))
      return next(createError(403, "You can update only your items!"));

    const updatedItem = await Item.findByIdAndUpdate(
      _id,
      { ...updateDetails, _id },
      { new: true }
    );

    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(409).json({
      message: err.message,
    });
  }
};

exports.deleteItem = async (req, res, next) => {
  const { itemId: _id } = req.params;

  try {
    const currentItem = await Item.findById(_id);

    if (!currentItem) return next(createError(404, "Item not found!"));

    if (String(currentItem.seller._id) !== String(req.userId))
      return next(createError(403, "You can only delete your items!"));

    await Item.findByIdAndDelete(_id);

    res.status(200).json({
      message: "Successfully deleted the item",
    });
  } catch (err) {
    res.status(409).json({
      message: err.message,
    });
  }
};

exports.blackOrWhiteList = async (req, res, next) => {
  const { itemId: _id } = req.params;
  const currentUser = await User.findById(req.userId);

  if (!currentUser.isAdmin)
    return next(createError(403, "You cannot blacklist an item!"));

  try {
    const currentItem = await Item.findById(_id);
    if (!currentItem) return next(createError(404, "Item not found!"));

    const blacklistStatus = currentItem.isBlacklisted;

    const updatedItem = await Item.findByIdAndUpdate(
      _id,
      { isBlacklisted: !blacklistStatus },
      { new: true }
    );

    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(409).json({
      message: err.message,
    });
  }
};
