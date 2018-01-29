module.exports = {
  rules: {
    // https://github.com/xjamundx/eslint-plugin-promise#rule-catch-or-return
    'promise/catch-or-return': ['error', {
      allowThen: false,
      terminationMethod: 'catch',
    }],

    // https://github.com/xjamundx/eslint-plugin-promise#rule-always-return
    'promise/always-return': 'error',

    // https://github.com/xjamundx/eslint-plugin-promise#param-names
    'promise/param-names': 'error',

    // https://github.com/xjamundx/eslint-plugin-promise#no-native
    'promise/no-native': 'off',

    // https://github.com/xjamundx/eslint-plugin-promise#rule-no-return-wrap
    'promise/no-return-wrap': 'error',

    'promise/no-nesting': 'error',

    'promise/no-promise-in-callback': 'error',

    'promise/no-callback-in-promise': 'error',
    'promise/prefer-await-to-then': 'error',
    'promise/prefer-await-to-callbacks': 'error',
    'promise/avoid-new': 'off',
    'promise/no-return-in-finally': 'error',
  },
};
