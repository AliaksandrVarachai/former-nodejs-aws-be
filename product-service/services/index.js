import * as dataProvider from '../data-access';

/**
 * Provides list of products.
 * @returns {Promise<Array[{ productId, title, description, price }]>}
 */
export async function index() {
  const productsList = await dataProvider.index();
  return productsList.map(({ product_id, title, description, price }) => ({
    productId: product_id,
    title,
    description,
    price,
  }));
}

/**
 * Provides a product by its ID or null if there is no such product.
 * @param id {string}
 * @returns {Promise<{ title, description, price }|null>}
 */
export async function getProductsById(id) {
  const [product] = await dataProvider.getProductsById(id);
  return product || null;
}
