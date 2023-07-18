const {client} = require("./client");

async function createProduct({ title, description, price }) {
  const {
    rows: [product],
  } = await client.query(
    `
        INSERT INTO products (title, description, price)
        VALUES ($1, $2, $3)
        ON CONFLICT (title) DO NOTHING
        RETURNING *;
    `,
    [title, description, price]
  );

  return product;
};

async function getAllProducts() {
  try {
    const { rows } = await client.query(`
        SELECT * FROM products;
        `);

    return rows;
  } catch (error) {
    console.log("Error in getAllProducts", error);
  }
};

async function getProductById(productId) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        SELECT * FROM products
        WHERE id = $1;
      `,
      [productId]
    );

    return product;
  } catch (error) {
    console.log("Error in getProductById");
    throw error;
  }
};

async function getProductByTitle(title) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        SELECT * FROM products
        WHERE title = $1; 
      `,
      [title]
    );

    return product;
  } catch (error) {
    console.log("Error in getProductByTitle");
    throw error;
  }
};

async function updateProduct({ productId, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=${index + 1}`)
    .join(",");

  try {
    if (setString.length > 0) {
      const {
        rows: [product],
      } = await client.query(
        `
          UPDATE products
          SET ${setString}
          WHERE productId=${productId}
          RETURNING *;
          `,
        Object.values(fields)
      );

      return product;
    }
  } catch (error) {
    console.log("Error in updateProduct");
    throw error;
  }
};

async function deleteProduct(productId) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      DELETE FROM products
      WHERE productId = $1
      RETURNING *;
      `,
      [productId]
    );

    return product;
  } catch (error) {
    console.log("Error in deleteProduct");
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByTitle,
  updateProduct,
  deleteProduct,
};