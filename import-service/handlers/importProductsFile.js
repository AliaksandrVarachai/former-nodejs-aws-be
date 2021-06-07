import AWS from 'aws-sdk';
import path from 'path';
import corsHeaders from './helpers/cors-headers';
import { getErrorView } from '../views';
import { logSuccess, logError } from './helpers/loggers';

const BUCKET = 'nodejs-aws-import-service';
const S3_OPTIONS = { region: 'eu-west-1' };
const UPLOADED_PATH = 'uploaded/';

export default async (event, context) => {
  const s3 = new AWS.S3(S3_OPTIONS);
  const { name: filename } = event.queryStringParameters;
  try {
    const signedUrl = await s3.getSignedUrlPromise('putObject', {
      Bucket: BUCKET,
      Key: path.join(UPLOADED_PATH, filename),
      Expires: 600,
      ContentType: 'text/csv',
    });
    const response = {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/plain',
      },
      statusCode: 200,
      body: signedUrl,
    };
    logSuccess(event, context, signedUrl);
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
