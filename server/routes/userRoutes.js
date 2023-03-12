const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/google-auth", authController.googleAuth);

router.get("/:userId", userController.getUser);

router.patch("/fav/:itemId", auth, userController.updateFavItems);

router.get("/", userController.getUsersForChat);

module.exports = router;
