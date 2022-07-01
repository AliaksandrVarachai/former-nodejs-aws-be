import AWS from 'aws-sdk-mock';
import importProductsFile from './importProductsFile';

const mockSignedUrl = 'signed-url';
// Promise mock bug: https://github.com/dwyl/aws-sdk-mock/issues/197#issuecomment-643438859
AWS.mock('S3', 'getSignedUrl', (_1, _2, cb) => cb(null, mockSignedUrl));

const mockCorsHeaders = {};
jest.mock('../../shared-libs/lib/cors-headers', () => mockCorsHeaders);

jest.mock('../../shared-libs/lib/loggers', () => ({
  logSuccess: () => {},
  logError: () => {},
}));

jest.mock('../views', () => ({
  getErrorView: (error) => error?.message || error,
}));

describe('importProductsFile', () => {
  afterAll(() => {
    AWS.restore();
  });

  it('will respond with a signed URL', async () => {
    // Arrange
    const event = {
      queryStringParameters: {
        name: 'file-name'
      }
    };
    const context = {};

    // Act
    const response = await importProductsFile(event, context);

    // Assert
    expect(response).toEqual({
      headers: {
        'Content-Type': 'text/plain',
      },
      statusCode: 200,
      body: mockSignedUrl,
    });
  });
});
