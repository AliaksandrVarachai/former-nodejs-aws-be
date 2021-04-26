'use strict';
import * as serviceProvider from '../services'
import corsHeaders from './helpers/cors-headers';
import { getSuccessView, getErrorView } from '../views';

export default async (event) => {
  try {
    const { title, description, price, count } = JSON.parse(event.body);
    const product = await serviceProvider.createProduct({ title, description, price, count });
    return {
      headers: corsHeaders,
      statusCode: 201,
      body: getSuccessView(product),
    };
  } catch (error) {
    return {
      headers: corsHeaders,
      statusCode: 400,
      body: getErrorView(error.message),
    }
  }
};
