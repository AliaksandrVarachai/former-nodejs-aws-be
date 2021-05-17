import AWS from 'aws-sdk';
import corsHeaders from './helpers/cors-headers';
import { getErrorView } from '../views';
import { logSuccess, logError } from './helpers/loggers';

const BUCKET = 'nodejs-aws-import-service';
const S3_OPTIONS = { region: 'eu-west-1' };

export default async (event, context) => {
  const s3 = new AWS.S3(S3_OPTIONS);
  const { name: filename } = event.queryStringParameters;
  const params = {
    Bucket: BUCKET,
    Key: filename,
  };
  try {
    const s3Response = await s3.getObject(params).promise();
    const response = {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/csv',
      },
      statusCode: 200,
      body: s3Response.Body.toString(),
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
}
