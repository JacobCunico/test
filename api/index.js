const express = require("express");
const router = express.Router();
const cartRouter = require("./ShoppingCart");
const productsRouter = require("./products");

router.use('/', (req, res, next) => {
    console.log('request came in to the api router');
    next();
  });

router.use("/cart", cartRouter);
router.use("/products", productsRouter);

module.exports = router