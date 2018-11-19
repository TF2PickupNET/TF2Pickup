// @flow strict-local

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
  babel: { testOptions: { configFile: './babel.client.config.js' } },
};
