// @flow strict-local

module.exports = {
  presets: [
    '@babel/preset-flow',
    ['@babel/preset-env', {
      targets: { node: 'current' },
      loose: true,
      useBuiltIns: 'usage',
    }],
    '@babel/preset-react',
  ],

  plugins: [
    ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
  ],

  ignore: [
    '*.test.js',
    'src/webapp/*',
    'src/webapp/**/*',
  ],
};