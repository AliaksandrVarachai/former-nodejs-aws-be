'use strict';
import * as serviceProvider from '../services'

const commonResponse = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  }
}

export default async (event) => {
  const { productId } = event.pathParameters;
  const product = await serviceProvider.getProductsById(productId);

  return product
    ? {
      ...commonResponse,
      statusCode: 200,
      body: JSON.stringify(product),
    }
    : {
      ...commonResponse,
      statusCode: 404,
      body: JSON.stringify({
        error: {
          message: 'Product is not found',
        },
      }),
    };
};
