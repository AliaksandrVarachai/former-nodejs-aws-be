import AWS from 'aws-sdk';
import csvParser from 'csv-parser';

const BUCKET = 'nodejs-aws-import-service';
const S3_OPTIONS = { region: 'eu-west-1' };
const UPLOADED_PATH = 'uploaded/';
const PARSED_PATH = 'parsed/';

export default async (event, context) => {
  const s3 = new AWS.S3(S3_OPTIONS);
  for (const record of event.Records) {
    const s3ObjectKey = record.s3.object.key;
    const params = {
      Bucket: BUCKET,
      Key: s3ObjectKey,
    };
    try {
      const s3Stream = s3.getObject(params).createReadStream();
      console.log(`Parsing of ${s3ObjectKey} is started`);
      s3Stream
        .pipe(csvParser())
        .on('data', (data) => {
          console.log(`${s3ObjectKey}: Parsed data chunk:`, data);
        })
        .on('end', () => {
          console.log(`${s3ObjectKey} is parsed successfully`) // Writable stream is finished ('close' for readable)
        })
        .on('error', (error) => {
          console.error(error);
        });

      await s3.copyObject({
        Bucket: BUCKET,
        CopySource: `${BUCKET}/${s3ObjectKey}`,
        Key: s3ObjectKey.replace(UPLOADED_PATH, PARSED_PATH),
      }).promise();
      console.log(`${s3ObjectKey} is successfully copied to ${PARSED_PATH}`);

      await s3.deleteObject({
        Bucket: BUCKET,
        Key: s3ObjectKey,
      }).promise();
      console.log(`${s3ObjectKey} is successfully deleted from ${UPLOADED_PATH}`);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    statusCode: 202,
  };
}