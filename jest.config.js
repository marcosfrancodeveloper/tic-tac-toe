const baseConfig = require('./jest.base.config');

module.exports = {
  ...baseConfig,
  roots: ['<rootDir>/src/'],
  coverageDirectory: '<rootDir>/coverage/tic-tac-toe',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: [
        'jest-preset-angular/build/InlineFilesTransformer',
        'jest-preset-angular/build/StripStylesTransformer',
      ],
    },
  },
  coverageThreshold: {
    global: {
      statements: 41,
      branches: 17,
      lines: 37,
      functions: 26,
    },
  },
};
