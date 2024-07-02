module.exports = {
  preset: 'jest-puppeteer',
  testMatch: [
    '**/__tests__/**/*.test.js',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  setupFilesAfterEnv: ['./setupTests.js'], // Se necessário
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  extensionsToTreatAsEsm: ['.jsx'], // Se necessário
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};