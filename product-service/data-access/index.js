import { Client } from 'pg';

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

const client = new Client({
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
});

export async function index() {
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
