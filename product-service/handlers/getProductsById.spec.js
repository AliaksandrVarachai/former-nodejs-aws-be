import getProductsById, { productsList } from './getProductsById';

describe('getProductsById', () => {
  it('should return statusCode 200',async () => {
    const mockedEvent = {
      pathParameters: {
        productId: productsList[0].id
      }
    };
    const response = await getProductsById(mockedEvent);
    expect(response).toMatchObject({ statusCode: 200 });
  });

  it('should return statusCode 404', async () => {
    const mockedEvent = {
      pathParameters: {
        productsId: 'some-wrong-id'
      }
    };
    const response = await getProductsById(mockedEvent);
    expect(response).toMatchObject({ statusCode: 404 });
  })
});
