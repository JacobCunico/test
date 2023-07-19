const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { getUserById } = require('../db/Users');
const cartRouter = require("./ShoppingCart");
const productsRouter = require("./products");
const usersRouter = require("./users")

router.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');


  if (!auth) {
      next();
  } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      try {
          const { id } = jwt.verify(token, JWT_SECRET);
          if (id) {
              req.user = await getUserById(id);
              next();
          }
      } catch ({ name, message }) {
          next({ name, message });
      }
  } else {
      next({
          name: 'AuthorizationHeaderError',
          message: `Authorization token must start with ${prefix}`,
      });
  }
});

router.use('/', (req, res, next) => {
    console.log('request came in to the api router');
    next();
  });

router.use("/cart", cartRouter);
router.use("/products", productsRouter);
router.use('/users', usersRouter);

module.exports = router