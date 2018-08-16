module.exports = {
  extends: [
    'henribeck',
    'henribeck/flow',
  ],

  rules: {
    'import/no-extraneous-dependencies': 'off',
  },

  overrides: [{
    files: ["*.test.js"],
    env: { node: true },
  }, {
    files: [
      'flow-typed/*.js',
      'flow-typed/**/*.js',
    ],
    rules: {
      'import/unambiguous': 'off',
      'flowtype/require-types-at-top': 'off',
      'import/no-unresolved': 'off',
      'import/extensions': 'off',
    },
  }, {
    files: [
      'webpack.*.config.js',
    ],
    rules: {
      'import/unambiguous': 'off',
      'import/no-commonjs': 'off',
    },
  }],
};
