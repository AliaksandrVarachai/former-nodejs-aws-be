'use strict';
import * as serviceProvider from '../services'

const commonResponse = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  }
}

export default async (event) => {
  const { title, description, price, count } = JSON.parse(event.body);
  const product = await serviceProvider.createProduct({ title, description, price, count });

  return product
    ? {
      ...commonResponse,
      statusCode: 200,
      body: JSON.stringify(product),
    }
    : {
      ...commonResponse,
      statusCode: 401,
      body: JSON.stringify({
        error: {
          message: 'Product is not created',
        },
      }),
    };
};
