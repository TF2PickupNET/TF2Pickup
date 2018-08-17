// @flow strict-local

export default {
  require: [
    'raf/polyfill',
    '@babel/register',
  ],

  files: ['src/**/*.test.js'],
};
