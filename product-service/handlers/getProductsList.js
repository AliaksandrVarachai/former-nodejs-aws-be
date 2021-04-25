'use strict';
import * as serviceProvider from '../services';

export default async (event) => {
  const productList = await serviceProvider.index();
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(productList),
  };
};
