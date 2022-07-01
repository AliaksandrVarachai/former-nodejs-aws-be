'use strict';
import * as serviceProvider from '../services';
import corsHeaders from '../../shared-libs/lib/cors-headers';
import { getSuccessView, getErrorView } from '../views';
import { logSuccess, logError } from '../../shared-libs/lib/loggers';

export default async (event, context) => {
  try {
    const productList = await serviceProvider.getProductsList();
    const response = {
      statusCode: 200,
      headers: corsHeaders,
      body: getSuccessView(productList),
    };
    logSuccess(event, context);
    return response;
  } catch (error) {
    const response =  {
      statusCode: 404,
      headers: corsHeaders,
      body: getErrorView(error),
    };
    logError(event, context, error);
    return response;
  }
};
