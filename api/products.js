const express = require("express");

const {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByTitle,
  updateProduct,
} = require("../db");

const productsRouter = express.Router();

productsRouter.use('*', (req, res, next) => {
    console.log("REACHING PRODUCTS ROUTER");
    next();
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    next.error;
  }
});

productsRouter.post("/", async (req, res, next) => {
  const { title, description } = req.body;

  try {
    const product = getAllProducts(title);

    if (product) {
      res.send({
        error: "Product Already Exists",
        message: `A Product with title ${title} already exists`,
        name: "product Already Exists",
      });
    } else {
      const createdProduct = await createProduct({ title, description });

      res.send(createdProduct);
    }
  } catch (error) {
    next.error;
  }
});

productsRouter.patch("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  const { title, description } = req.body;

  try {
    const checkProductId = getProductById(productId);

    if (!checkProductId) {
      res.send({
        error: "Product Not Found",
        message: `Product ${productId} not found`,
        name: "ProductAlreadyExists",
      });
    }

    const productTitle = await getProductByTitle(title);

    if (productTitle && productTitle.id !== productId) {
      res.send({
        error: "Product Already Exists",
        message: `A product with title ${productTitle.title} already exists`,
        name: "ProductAlreadyExists",
      });
    } else {
      const update = await updateProduct({
        productId: productId,
        title: title,
        description: description,
      });

      res.send(update);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = productsRouter;












