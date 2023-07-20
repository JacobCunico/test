const express = require("express");
const cartRouter = express.Router();
const {
    getCart,
    addToCart,
    deleteItem,
    createUserCart
} = require("../db");

cartRouter.use('*', (req, res, next) => {
    console.log("REACHING CART ROUTER");
    next();
});

cartRouter.get("/:userId", async (req, res, next) => {
    console.log("API ROUTER")
    const {userId} = req.params;
    try{
        const cart = await getCart(userId);
        res.send(cart)
    } catch(error) {
        next(error)
    }
});

cartRouter.post("/", async (req, res, next) => {
    const {shoppingId, productId, quantity} = req.body;
    console.log("POST ROUTER")
    try{
        const newItem = await addToCart({
            shoppingId: shoppingId, 
            productId: productId, 
            quantity: quantity});
        res.send(newItem)
    } catch (error) {
        next(error)
    }
});

cartRouter.delete("/:productId", async (req, res, next) => {
    const {productId} = req.params;
    console.log("TRYING TO DELETE")
    try{
        const removeItem = await deleteItem(productId);
        res.send(removeItem);
    } catch(error) {
        next(error);
    }
});

cartRouter.post("/:userId", async (req, res, next) => {
    const {userId} = req.params;
    try{
        const userCart = await createUserCart(userId);
        res.send(userCart);
    } catch(error) {
        next(error);
    }
});

module.exports = cartRouter;