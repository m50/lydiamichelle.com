module.exports = {
  clearMocks: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '<rootDir>/src/**/*.tsx'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  coverageReporters: [
    'text',
  ],
  setupFiles: [
    '<rootDir>/prepare.js',
  ],
  testMatch: [
    '<rootDir>/src/**/?(*.)+(spec|test).[tj]s',
    '<rootDir>/src/**/?(*.)+(spec|test).[tj]sx',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/public/',
    '<rootDir>/.next/',
  ],
  moduleDirectories: ['<rootDir>/src', '<rootDir>/node_modules'],
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
    'tsx',
    'jsx'
  ],
  testURL: 'http://localhost',
};
