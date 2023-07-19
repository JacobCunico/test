const { client } = require("./client");

async function dropTables() {
  console.log("dropping all tables");

  await client.query(`
    DROP TABLE IF EXISTS cartItems, shoppingCart, products, users CASCADE
    `);
  console.log("finished dropping tables")
}

async function createTables() {

  try{
    console.log("Starting to build tables");
    await client.query(`
      CREATE TABLE users (
        "userId" SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
      CREATE TABLE products (
          "productId" SERIAL PRIMARY KEY,
          title VARCHAR(255) UNIQUE NOT NULL,
          description TEXT NOT NULL,
          
          price INTEGER
      ); 
      CREATE TABLE shoppingCart(
        "cartId" SERIAL PRIMARY KEY,
        "ownerId" INTEGER REFERENCES users ( "userId" )
      );
      CREATE TABLE cartItems(
        "cartItemId" SERIAL PRIMARY KEY,
        "shoppingId" INTEGER REFERENCES shoppingCart ( "cartId" ),
        "itemId" INTEGER REFERENCES products ( "productId" ),
        quantity INTEGER
    );
    `);
    console.log("finished building tables")
} catch(error) {
  console.log("error building tables", error);
}}

async function createInitialProducts() {
  try{
    console.log('CREATING INTITIAL PRODUCTS');
    await client.query(`
    INSERT INTO products (title, description, price)
        VALUES ($1, $2, $3)
        ON CONFLICT (title) DO NOTHING
        RETURNING *;
    `, ["Broken train", "Train missing a wheel", 1]);
    await client.query(`
    INSERT INTO products (title, description, price)
        VALUES ($1, $2, $3)
        ON CONFLICT (title) DO NOTHING
        RETURNING *;
    `, ["Spare Wheel", "A wheel that fell off of a train", 2]);
    await client.query(`
    INSERT INTO products (title, description, price)
        VALUES ($1, $2, $3)
        ON CONFLICT (title) DO NOTHING
        RETURNING *;
    `, ["Squirt gun", "A gun that only shoots foam bullets", 5]);
    await client.query(`
    INSERT INTO products (title, description, price)
        VALUES ($1, $2, $3)
        ON CONFLICT (title) DO NOTHING
        RETURNING *;
    `, ["Kite", "a green kite missing its string", 3]);
    await client.query(`
    INSERT INTO products (title, description, price)
        VALUES ($1, $2, $3)
        ON CONFLICT (title) DO NOTHING
        RETURNING *;
    `, ["Loose Thread", "a bundle of loose thread", 10]);
    await client.query(`
    INSERT INTO products (title, description, price)
        VALUES ($1, $2, $3)
        ON CONFLICT (title) DO NOTHING
        RETURNING *;
    `, ["Toy Soldier", "a toy soldier made out of lead", 4]);
    await client.query(`
    INSERT INTO products (title, description, price)
        VALUES ($1, $2, $3)
        ON CONFLICT (title) DO NOTHING
        RETURNING *;
    `, ["Rock paper scissors instruction book", "Rules for the game", 7]);
    console.log("FINISHED CREATING INITIAL PRODUCTS")
  } catch(error) {
    console.log("ERROR CREATING INTITAL PRODUCTS", error);
  }
};
async function createInitialUsers() {
  try{
    console.log('CREATING INTITIAL USERS');
    await client.query(`
    INSERT INTO users (username, password)
        VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
    `, ["username", "password"]);
    console.log("FINISHED CREATING INITIAL USERS")
  } catch(error) {
    console.log("ERROR CREATING INTITAL USERS", error);
  }
};
async function createInitialCart() {
  try{
    console.log('CREATING INTITIAL CART');
    await client.query(`
    INSERT INTO shoppingCart ("ownerId")
        VALUES ($1)
        RETURNING *;
    `, [1]);
    console.log("FINISHED CREATING INITIAL CART")
  } catch(error) {
    console.log("ERROR CREATING INTITAL CART", error);
  }
};

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createInitialProducts();
    await createInitialUsers();
    await createInitialCart();
  } catch (error) {
    console.log("Error during rebuildDB", error);
  }
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
};
