'use strict';
import * as serviceProvider from '../services'
import corsHeaders from '../../libs/cors-headers';
import { getSuccessView, getErrorView } from '../views';
import { logSuccess, logError } from '../../libs/loggers';

export default async (event, context) => {
  const { title, description, price, count } = JSON.parse(event.body);
  // TODO: replace with schema validation
  if (!title || typeof title !== 'string' || typeof description !== 'string'
    || typeof price !== 'number' || typeof count !== 'number') {
    const dataErrorMessage = `Wrong data. Requirements: 
title is not empty string,
description is string,
price is number,
count is number.`
    const response = {
      headers: corsHeaders,
      statusCode: 400,
      body: getErrorView(dataErrorMessage),
    };
    logError(event, context, dataErrorMessage)
    return response;
  }

  try {
    const product = await serviceProvider.createProduct({ title, description, price, count });
    const response = {
      headers: corsHeaders,
      statusCode: 201,
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
