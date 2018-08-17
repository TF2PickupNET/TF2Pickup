module.exports = {
  extends: [
    'henribeck',
    'henribeck/flow',
    'henribeck/react',
  ],


  // overrides: [{
  //   files: ["*.test.js"],
  //   env: { node: true },
  // }, {
  //   files: [
  //     'flow-typed/*.js',
  //     'flow-typed/**/*.js',
  //   ],
  //   rules: {
  //     'import/unambiguous': 'off',
  //     'flowtype/require-types-at-top': 'off',
  //     'import/no-unresolved': 'off',
  //     'import/extensions': 'off',
  //   },
  // }, {
  //   files: [
  //     'webpack.*.config.js',
  //   ],
  //   rules: {
  //     'import/unambiguous': 'off',
  //     'import/no-commonjs': 'off',
  //   },
  // }],
};
