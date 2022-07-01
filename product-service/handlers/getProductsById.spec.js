import getProductsById from './getProductsById';
import * as mockServiceProvider from '../services';
import * as mockLoggers from '../../shared-libs/lib/loggers';

jest.mock('../views', () => ({
  getSuccessView: (value) => value,
  getErrorView: ({ message }) => ({ error: { message } }),
}));

jest.mock('../services', () => ({
  getProductsById: jest.fn(),
}));

jest.mock('../../shared-libs/lib/loggers', () => ({
  logSuccess: jest.fn(),
  logError: jest.fn(),
}));

describe('getProductsById', () => {
   beforeEach(() => {
     jest.resetAllMocks();
   });

  it('should return statusCode 200',async () => {
    const fakeProductId = 'product-id';
    mockServiceProvider.getProductsById.mockImplementation(() => Promise.resolve({
      id: fakeProductId,
    }));
    const mockedEvent = {
      pathParameters: {
        productId: fakeProductId
      }
    };
    const response = await getProductsById(mockedEvent);
    expect(response).toMatchObject({
      statusCode: 200,
      body: {
        id: fakeProductId
      },
    });
    expect(mockLoggers.logSuccess).toBeCalledTimes(1);
    expect(mockLoggers.logError).not.toBeCalled();
  });

  it('should return statusCode 404', async () => {
    const fakeErrorMessage = 'some-error-message';
    mockServiceProvider.getProductsById.mockImplementation(() => { throw Error(fakeErrorMessage); });
    const mockedEvent = {
      pathParameters: {
        productsId: 'some-wrong-id'
      }
    };
    const response = await getProductsById(mockedEvent);
    expect(response).toMatchObject({
      statusCode: 404,
      body: {
        error: {
          message: fakeErrorMessage,
        },
      },
    });
    expect(mockLoggers.logSuccess).not.toBeCalled();
    expect(mockLoggers.logError).toBeCalledTimes(1);
  });
});
