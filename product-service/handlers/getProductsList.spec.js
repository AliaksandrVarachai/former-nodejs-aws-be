import getProductsList from './getProductsList';

describe('getProductsList', () => {
  it('should return statusCode 200',async () => {
    const response   = await getProductsList();
    expect(response).toMatchObject({ statusCode: 200 });
    expect(response.body)
  });

  it('should return list of products in the body', async () => {
    const products = JSON.parse((await getProductsList()).body);
    expect(products).toBeInstanceOf(Array);
  });
});
