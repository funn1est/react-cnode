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
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/test/fileMock.js',
    '\\.(css|less|scss|sass)$': '<rootDir>/test/styleMock',

    '^common(.*)$': '<rootDir>/src/common$1',
    '^components(.*)$': '<rootDir>/src/components$1',
    '^layouts(.*)$': '<rootDir>/src/layouts$1',
    '^routes(.*)$': '<rootDir>/src/routes$1',
    '^services(.*)$': '<rootDir>/src/services$1',
    '^store(.*)$': '<rootDir>/src/store$1',
    '^utils(.*)$': '<rootDir>/src/utils$1',
  },
};
