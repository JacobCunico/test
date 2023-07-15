const {client} = require("./client");

//adds shoppingcart, product and quantity to cart
async function addToCart({shoppingId, productId, quantity}) {
    try{
        const { rows } = await client.query(`
        INSERT INTO cartItems("shoppingId", "itemId", quantity)
        VALUES ($1, $2, $3)
        RETURNING *;
        `, [shoppingId, productId, quantity]);
        console.log("cart", rows);
        return rows;
    } catch(ex) {
        console.log(ex);
    }
};

//gets the cartItems instance based on shoppingCartId and the ownerId
async function getCart(userId) {
    try{

    const {rows: [usercart] } = await client.query(`
        SELECT cartId from shoppingCart
        WHERE "ownerId" = $1
    `, [userId])

    const {rows: shoppingCart } = await client.query(`
    SELECT *
    FROM cartItems
    WHERE "shoppingId" = $1
    `, [usercart]);
    
    console.log("shopping cart", shoppingCart);

    return shoppingCart
    } catch(ex) {
        console.log(ex)
    }
};

//deletes an item from the cartItems list
async function deleteItem(id) {
    try{
        const {rows: newItems} = await client.query(`
            DELETE FROM cartItems
            WHERE cartItemId = $1
            RETURNING *;
        `, [id]);
        console.log("DELETE", newItems);
        return newItems
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    addToCart,
    getCart,
    deleteItem
};