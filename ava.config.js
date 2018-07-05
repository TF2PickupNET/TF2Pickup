// @flow strict-local

export default {
  require: [
    'raf/polyfill',
    '@babel/register',
    './tests/browser-env.js',
  ],

  files: ['packages/**/*.test.js'],
};
