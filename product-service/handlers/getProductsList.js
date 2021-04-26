'use strict';
import * as serviceProvider from '../services';
import corsHeaders from './helpers/cors-headers';
import { getSuccessView, getErrorView } from '../views';

export default async (event) => {
  try {
    const productList = await serviceProvider.getProductsList();
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: getSuccessView(productList),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: getErrorView(error.message),
    }
  }
};
