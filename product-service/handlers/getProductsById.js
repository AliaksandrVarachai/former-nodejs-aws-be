'use strict';
import * as serviceProvider from '../services';
import corsHeaders from './helpers/cors-headers';
import { getSuccessView, getErrorView } from '../views';
import { logSuccess, logError } from './helpers/loggers';

export default async (event, context) => {

  const { productId } = event.pathParameters;
  try {
    const product = await serviceProvider.getProductsById(productId);
    const response = {
      headers: corsHeaders,
      statusCode: 200,
      body: getSuccessView(product),
    };
    logSuccess(event, context);
    return response;
  } catch (error) {
    const response = {
      headers: corsHeaders,
      statusCode: 500,
      body: getErrorView(error),
    };
    logError(event, context, error);
    return response;
  }
};
