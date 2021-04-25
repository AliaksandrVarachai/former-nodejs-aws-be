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
    const res = await client.query('SELECT product_id, title, description, price FROM products');
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
    const res = await client.query('SELECT title, description, price FROM products WHERE $1=product_id', [id]);
    return res.rows;
  } catch (error) {
    throw(error.message);
  } finally {
    await client.end();
  }
}
