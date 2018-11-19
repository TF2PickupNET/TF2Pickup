// @flow strict-local

module.exports = {
  presets: [
    '@babel/preset-flow',
    ['@babel/preset-env', {
      targets: {
        chrome: 65,
        firefox: 59,
      },
      loose: true,
      useBuiltIns: 'usage',
    }],
    '@babel/preset-react',
  ],

  plugins: [
    ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
    '@babel/plugin-proposal-class-properties',
    'macros',
  ],

  ignore: ['*.test.js'],
};
