import getProductsList from './getProductsList';
import * as mockServiceProvider from '../services';
import * as mockLoggers from '../../shared-libs/lib/loggers';

jest.mock('../views', () => ({
  getSuccessView: (value) => value,
  getErrorView: ({ message }) => ({ error: { message } }),
}));

jest.mock('../services', () => ({
  getProductsList: jest.fn(),
}));

jest.mock('../../shared-libs/lib/loggers', () => ({
  logSuccess: jest.fn(),
  logError: jest.fn(),
}));


describe('getProductsList', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return statusCode 200',async () => {
    const fakeProductsList = [
      { id: 'product-id-0' },
      { id: 'product-id-1' },
      { id: 'product-id-2' },
    ];
    mockServiceProvider.getProductsList.mockImplementation(() => Promise.resolve(fakeProductsList));

    const response = await getProductsList();
    expect(response).toMatchObject({
      statusCode: 200,
      body: fakeProductsList,
    });
    expect(mockLoggers.logSuccess).toBeCalledTimes(1);
    expect(mockLoggers.logError).not.toBeCalled();
  });

  it('should return statusCode 404', async () => {
    const fakeErrorMessage = 'some-error-message';
    mockServiceProvider.getProductsList.mockImplementation(() => { throw Error(fakeErrorMessage); });
    const response = await getProductsList();
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
