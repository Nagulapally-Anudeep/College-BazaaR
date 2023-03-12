const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const chatController = require("../controllers/chatController");

router
  .route("/")
  .post(auth, chatController.accessChat)
  .get(auth, chatController.fetchChats);

module.exports = router;
