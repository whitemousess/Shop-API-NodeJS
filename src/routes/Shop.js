const express = require("express");
const router = express.Router();

const checkLogin = require('../middleware/login')
const shopController = require("../controllers/ShopController");

router.get("/get-to-card", checkLogin, shopController.getToCard);
router.post("/add-to-card", checkLogin, shopController.addToCard);
router.delete("/delete-to-card/:id", checkLogin, shopController.deleteToCard);

module.exports = router;
