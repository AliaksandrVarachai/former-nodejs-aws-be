'use strict';
import * as serviceProvider from '../services';
import corsHeaders from './helpers/cors-headers';
import { getSuccessView, getErrorView } from '../views';

export default async (event) => {
  const { productId } = event.pathParameters;
  try {
    const product = await serviceProvider.getProductsById(productId);
    return {
      headers: corsHeaders,
      statusCode: 200,
      body: getSuccessView(product),
    };
  } catch (error) {
    return {
      headers: corsHeaders,
      statusCode: 500,
      body: getErrorView(error),
    };
  }
};
