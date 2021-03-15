module.exports = {
  clearMocks: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '<rootDir>/src/**/*.tsx'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
  coverageProvider: 'v8',
  coverageReporters: [
    'text',
  ],
  setupFiles: [
    '<rootDir>/prepare.js',
  ],
  testMatch: [
    '<rootDir>/src/**/?(*.)+(spec|test).[tj]s?(x)',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/public/',
    '<rootDir>/.next/',
  ],
  modulePaths: ['src'],
  testURL: 'http://localhost',
};
