'use strict';
import * as serviceProvider from '../services'
import corsHeaders from './helpers/cors-headers';
import { getSuccessView, getErrorView } from '../views';

export default async (event) => {
  const { title, description, price, count } = JSON.parse(event.body);
  // TODO: replace with schema validation
  if (!title || typeof title !== 'string' || typeof description !== 'string'
    || typeof price !== 'number' || typeof count !== 'number') {
    return {
      headers: corsHeaders,
      statusCode: 400,
      body: getErrorView(`Wrong data. Requirements: 
title is not empty string,
description is string,
price is number,
count is number.`),
    };
  }

  try {
    const product = await serviceProvider.createProduct({ title, description, price, count });
    return {
      headers: corsHeaders,
      statusCode: 201,
      body: getSuccessView(product),
    };
  } catch (error) {
    return {
      headers: corsHeaders,
      statusCode: 500,
      body: getErrorView(error),
    }
  }
};
