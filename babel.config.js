// @flow strict-local

// eslint-disable-next-line import/unambiguous, import/no-commonjs
module.exports = {
  presets: [
    '@babel/preset-flow',
    ['@babel/preset-env', {
      targets: {
        node: 'current',
        chrome: 65,
        firefox: 59,
      },
      loose: false,
      useBuiltIns: 'usage',
    }],
    '@babel/preset-react',
  ],

  plugins: [
    ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-export-default-from',
  ],

  ignore: ['*.test.js'],
};
