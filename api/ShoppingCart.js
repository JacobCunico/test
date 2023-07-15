const express = require("express");
const cartRouter = express.Router();
const {
    getCart,
    addToCart,
    deleteItem
} = require("../db");

cartRouter.use('*', (req, res, next) => {
    console.log("REACHING CART ROUTER");
    next();
});

cartRouter.get("/", async (req, res, next) => {
    const {id} = req.params;
    try{
        const cart = await getCart(id);
        res.send(cart)
    } catch(error) {
        next(error)
    }
});

cartRouter.post("/", async (req, res, next) => {
    const {shoppingId, productId, quantity} = req.body;
    try{
        const newItem = await addToCart(shoppingId, productId, quantity);
        res.send(newItem)
    } catch (error) {
        next(error)
    }
});

cartRouter.delete("/:productId"), async (req, res, next) => {
    const {productId} = req.params;
    try{
        const removeItem = await deleteItem(productId);
        res.send(removeItem);
    } catch(error) {
        next(error);
    }
};

module.exports = cartRouter;