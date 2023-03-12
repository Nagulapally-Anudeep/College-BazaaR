const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const auth = require("../middleware/auth");

router.get("/search", itemController.getItemsBySearch);

router.patch("/blacklist/:itemId", auth, itemController.blackOrWhiteList);

router
  .route("/")
  .get(itemController.getAllItems)
  .post(auth, itemController.createItem);

router
  .route("/:itemId")
  .get(itemController.getItem)
  .patch(auth, itemController.updateItem)
  .delete(auth, itemController.deleteItem);

module.exports = router;
