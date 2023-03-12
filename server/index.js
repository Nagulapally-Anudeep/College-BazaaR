const express = require("express");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const itemRouter = require("./routes/itemRoutes");
const chatRouter = require("./routes/chatRoutes");

const app = express();
dotenv.config();

app.use(cors());

// Limit requests from an IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP! Please try after an hour.",
});

app.use("/api", limiter);

app.use(cookieParser());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

// Data sanitization against NoSQL query injections
app.use(mongoSanitize());

// Data sanitization against XSS attacks
app.use(xss());

// routes
app.use("/api/users", userRouter);
app.use("/api/items", itemRouter);
app.use("/api/chats", chatRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";

  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

const connect = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to DB!"))
    .catch((err) => {
      throw err;
    });
};

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connect();
  console.log("Server is running on PORT 8000!");
});
