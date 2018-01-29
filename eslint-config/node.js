module.exports = {
  rules: {
    // http://eslint.org/docs/rules/callback-return
    'callback-return': ['error', [
      'callback',
      'next',
      'cb',
      'done',
    ]],

    // http://eslint.org/docs/rules/global-require
    'global-require': 'error',

    // http://eslint.org/docs/rules/handle-callback-err
    'handle-callback-err': ['error', '^(err|error)$'],

    // http://eslint.org/docs/rules/no-buffer-constructor
    'no-buffer-constructor': 'error',

    // http://eslint.org/docs/rules/no-mixed-requires
    'no-mixed-requires': ['error', {
      grouping: false,
      allowCall: false,
    }],

    // http://eslint.org/docs/rules/no-new-require
    'no-new-require': 'error',

    // http://eslint.org/docs/rules/no-path-concat
    'no-path-concat': 'error',

    // http://eslint.org/docs/rules/no-process-env
    'no-process-env': 'off',

    // http://eslint.org/docs/rules/no-process-exit
    'no-process-exit': 'error',

    // http://eslint.org/docs/rules/no-restricted-modules
    'no-restricted-modules': 'error',

    // http://eslint.org/docs/rules/no-sync
    'no-sync': 'off',
  },
};
