import { Client } from 'pg';
import dbOptions from './db-options';

export async function getProductsList() {
  const client = new Client(dbOptions);
  await client.connect();
  try {
    const res = await client.query(
      `
        SELECT 
          p.product_id, 
          p.title, 
          p.description, 
          p.price, 
          SUM(s.count) AS count 
        FROM products AS p
        INNER JOIN stocks AS s 
        ON p.product_id = s.product_id
        GROUP BY p.product_id
        HAVING SUM(s.count) > 0
        ORDER BY p.title;
      `
    );
    return res.rows;
  } catch (error) {
    throw(error.message);
  } finally {
    await client.end();
  }
}

export async function getProductsById(id) {
  const client = new Client(dbOptions);
  await client.connect();
  try {
    const res = await client.query(
      `
        WITH all_stocks AS (
          SELECT count FROM stocks WHERE product_id = $1
        )
        SELECT 
          p.product_id, 
          p.title, 
          p.description, 
          p.price, 
          (SELECT SUM(count) from all_stocks) AS count 
        FROM products AS p
        WHERE p.product_id = $1;
      `,
      [id]
    );
    return res.rows;
  } catch (error) {
    throw(error.message);
  } finally {
    await client.end();
  }
}

export async function createProduct({ title, description, price, count }) {
  const client = new Client(dbOptions);
  await client.connect();
  try {
    await client.query('BEGIN');
    const { rows: [{ product_id }] } = await client.query(
      `
        INSERT INTO products (title, description, price)
        VALUES ($1, $2, $3)
        RETURNING product_id;
      `,
      [title, description, price]
    );

    const { rows: [{ stock_id }] } = await client.query(
      `
        INSERT INTO stocks (product_id, count)
        VALUES ($1, $2)
        RETURNING stock_id;
      `,
      [product_id, count]
    );
    await client.query('COMMIT');
    return {
      product_id,
      title,
      description,
      price,
      stock_id,
      count,
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw(error.message);
  } finally {
    await client.end();
  }
}
