module.exports = {
  verbose: true,
  automock: false,
  collectCoverage: true,
  coverageDirectory: './coverage',
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  modulePaths: ['<rootDir>/123'],
};