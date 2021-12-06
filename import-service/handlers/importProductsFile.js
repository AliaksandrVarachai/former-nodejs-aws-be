import AWS from 'aws-sdk';
import path from 'path';
import corsHeaders from '../../shared-libs/lib/cors-headers';
import { getErrorView } from '../views';
import { logSuccess, logError } from '../../shared-libs/lib/loggers';

const { S3_NAME, S3_OPTIONS_REGION, S3_UPLOADED_PATH } = process.env;
const s3Options = { region: S3_OPTIONS_REGION };

export default async (event, context) => {
  const s3 = new AWS.S3(s3Options);
  const { name: filename } = event.queryStringParameters;
  try {
    const signedUrl = await s3.getSignedUrlPromise('putObject', {
      Bucket: S3_NAME,
      Key: path.join(S3_UPLOADED_PATH, filename),
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
  } catch (error) /* istanbul ignore next */ {
    const response = {
      headers: corsHeaders,
      statusCode: 500,
      body: getErrorView(error),
    };
    logError(event, context, error);
    return response;
  }
}
