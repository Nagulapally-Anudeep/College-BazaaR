const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Fdefault-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392%3Fk%3D6%26m%3D1223671392%26s%3D170667a%26w%3D0%26h%3DzP3l7WJinOFaGb2i1F4g8IS2ylw0FlIaa6x3tP9sebU%3D&f=1&nofb=1&ipt=bd732aa53ec7e5ea845dea7ad0fb0897859dd159d4dfad0a08feae0b7c63b8a5&ipo=images",
  },
  email: {
    type: String,
    required: true,
  },
  postedItems: {
    type: [mongoose.Schema.ObjectId],
    ref: "Item",
  },
  favouriteItems: {
    type: [mongoose.Schema.ObjectId],
    ref: "Item",
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: "postedItems",
    select: "-__v",
  });
  next();
});

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: "favouriteItems",
    select: "-__v",
  });
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
