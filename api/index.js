const express = require("express");
const router = express.Router();
const cartRouter = require("./ShoppingCart");

router.use('/', (req, res, next) => {
    console.log('request came in to the api router');
    next();
  });

router.use("/cart", cartRouter)

module.exports = router