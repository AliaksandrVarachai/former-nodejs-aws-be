const slsw = require('serverless-webpack');

module.exports = {
  entry: {
    'getProductsList': './handlers/getProductsList.js',
    'getProductById': './handlers/getProductsById.js',
  },
  target: 'node',
}