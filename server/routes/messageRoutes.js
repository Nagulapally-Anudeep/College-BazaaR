const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.route("/:chatId").get(auth, messageController.getMessages);
router.route("/").post(auth, messageController.sendMessage);

module.exports = router;
