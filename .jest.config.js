module.exports = {
  setupFiles: [
    '<rootDir>/test/setup.js',
  ],
  moduleFileExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/test/',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/mock/fileMock.js',
    '\\.(css|less|scss|sass)$': '<rootDir>/mock/styleMock',
  },
};
