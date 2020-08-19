const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

// router.post("/cart", shopController.postCart);

// router.get("/cart", shopController.getCart);

// router.get("/order", shopController.getOrder);

// router.post("/create-order", shopController.postOrder);

// router.post("/cart-delete-product", shopController.postCartDeleteProduct);

module.exports = router;
