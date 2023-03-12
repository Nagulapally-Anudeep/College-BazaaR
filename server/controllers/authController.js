const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { createError } = require("../error");

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return next(createError(400, "User with the email already exists!"));

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      `${process.env.JWT_SECRET_KEY}`,
      {
        expiresIn: "5h",
      }
    );

    result.password = undefined;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(201)
      .json({ result, token });
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) return next(createError(404, "User doesn't exist!"));

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return next(createError(400, "Invalid credentials!"));

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      `${process.env.JWT_SECRET_KEY}`,
      {
        expiresIn: "5h",
      }
    );

    existingUser.password = undefined;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ result: existingUser, token });
  } catch (err) {
    next(err);
  }
};

exports.googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign(
        {
          email: user.email,
          id: user._id,
        },
        `${process.env.JWT_SECRET_KEY}`,
        {
          expiresIn: "5h",
        }
      );

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ result: user, token });
    } else {
      const newUser = new User({
        ...req.body,
        password: "google-oauth",
      });

      const savedUser = await newUser.save();

      const token = jwt.sign(
        { email: savedUser.email, id: savedUser._id },
        `${process.env.JWT_SECRET_KEY}`,
        {
          expiresIn: "5h",
        }
      );

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(201)
        .json({ result: savedUser, token });
    }
  } catch (err) {
    next(err);
  }
};
