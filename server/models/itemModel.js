const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true, // true -> unsold
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
    required: true,
  },
  pics: {
    type: String,
    required: true,
  },
  isBlacklisted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

itemSchema.pre(/^find/, function (next) {
  this.populate({
    path: "seller",
    select: "-__v -password -postedItems -favouriteItems",
  });
  next();
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
