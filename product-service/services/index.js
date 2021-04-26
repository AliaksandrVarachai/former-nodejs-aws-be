import * as dataProvider from '../data-access';

/**
 * Provides list of products.
 * @returns {Promise<Array[{ id, title, description, price, count }]>}
 */
export async function index() {
  const productsList = await dataProvider.index();
  return productsList.map(({ product_id, title, description, price, count }) => ({
    id: product_id,
    title,
    description,
    price,
    count: Number(count),
  }));
}

/**
 * Provides a product by its ID or null if there is no such product.
 * @param id {string}
 * @returns {Promise<{ id, title, description, price, count }|null>}
 */
export async function getProductsById(id) {
  const [product] = await dataProvider.getProductsById(id);
  if (!product) return null;
  const { product_id, title, description, price, count } = product;
  return {
    id: product_id,
    title,
    description,
    price,
    count: Number(count),
  };
}
