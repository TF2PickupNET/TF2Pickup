// @flow strict-local

import babel from './babel.client.config';

export default {
  require: [
    'raf/polyfill',
    './tests/setup/register.js',
  ],
  failFast: true,
  cache: true,
  concurrency: 5,
  failWithoutAssertions: true,
  verbose: true,
  compileEnhancements: true,
  files: ['src/**/*.test.js'],
  babel: { testOptions: babel },
};
