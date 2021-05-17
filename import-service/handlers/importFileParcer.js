import AWS from 'aws-sdk';
import corsHeaders from './helpers/cors-headers';

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
    const s3Response = await s3.getObject(params);
    const response = {
      headers: corsHeaders,
      statusCode: 200,
      body: JSON.stringify(s3Response),
    };
    return response;
  } catch (error) {
    const response = {
      headers: corsHeaders,
      statusCode: 500,
      body: JSON.stringify('error'),
    };
    return response;
  }
}