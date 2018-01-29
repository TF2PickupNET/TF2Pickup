module.exports = {
  rules: {
    // http://eslint.org/docs/rules/for-direction
    'for-direction': 'error',

    // http://eslint.org/docs/rules/getter-return
    'getter-return': ['error', { allowImplicit: false }],

    // http://eslint.org/docs/rules/no-await-in-loop
    'no-await-in-loop': 'error',

    // http://eslint.org/docs/rules/no-compare-neg-zero
    'no-compare-neg-zero': 'error',

    // http://eslint.org/docs/rules/no-cond-assign
    'no-cond-assign': ['error', 'always'],

    // http://eslint.org/docs/rules/no-console
    'no-console': 'error',

    // http://eslint.org/docs/rules/no-constant-condition
    'no-constant-condition': ['error', { checkLoops: true }],

    // http://eslint.org/docs/rules/no-control-regex
    'no-control-regex': 'error',

    // http://eslint.org/docs/rules/no-debugger
    'no-debugger': 'error',

    // http://eslint.org/docs/rules/no-dupe-args
    'no-dupe-args': 'error',

    // http://eslint.org/docs/rules/no-dupe-keys
    'no-dupe-keys': 'error',

    // http://eslint.org/docs/rules/no-duplicate-case
    'no-duplicate-case': 'error',

    // http://eslint.org/docs/rules/no-empty-character-class
    'no-empty-character-class': 'error',

    // http://eslint.org/docs/rules/no-empty
    'no-empty': ['error', { allowEmptyCatch: false }],

    // http://eslint.org/docs/rules/no-ex-assign
    'no-ex-assign': 'error',

    // http://eslint.org/docs/rules/no-extra-boolean-cast
    'no-extra-boolean-cast': 'error',

    // http://eslint.org/docs/rules/no-extra-parens
    // Waiting for https://github.com/eslint/eslint/issues/7444
    'no-extra-parens': ['off', 'all', { returnAssign: true }],

    // http://eslint.org/docs/rules/no-extra-semi
    'no-extra-semi': 'error',

    // http://eslint.org/docs/rules/no-func-assign
    'no-func-assign': 'error',

    // http://eslint.org/docs/rules/no-inner-declarations
    'no-inner-declarations': ['error', 'both'],

    // http://eslint.org/docs/rules/no-invalid-regexp
    'no-invalid-regexp': ['error', { allowConstructorFlags: [] }],

    // http://eslint.org/docs/rules/no-irregular-whitespace
    'no-irregular-whitespace': ['error', {
      skipStrings: false,
      skipComments: false,
      skipRegExps: false,
      skipTemplates: false,
    }],

    // http://eslint.org/docs/rules/no-obj-calls
    'no-obj-calls': 'error',

    // http://eslint.org/docs/rules/no-prototype-builtins
    'no-prototype-builtins': 'error',

    // http://eslint.org/docs/rules/no-regex-spaces
    'no-regex-spaces': 'error',

    // http://eslint.org/docs/rules/no-sparse-arrays
    'no-sparse-arrays': 'error',

    // http://eslint.org/docs/rules/no-template-curly-in-string
    'no-template-curly-in-string': 'error',

    // http://eslint.org/docs/rules/no-unexpected-multiline
    'no-unexpected-multiline': 'error',

    // http://eslint.org/docs/rules/no-unreachable
    'no-unreachable': 'error',

    // http://eslint.org/docs/rules/no-unsafe-finally
    'no-unsafe-finally': 'error',

    // http://eslint.org/docs/rules/no-unsafe-negation
    'no-unsafe-negation': 'error',

    // http://eslint.org/docs/rules/use-isnan
    'use-isnan': 'error',

    // http://eslint.org/docs/rules/valid-jsdoc
    'valid-jsdoc': 'off',

    // http://eslint.org/docs/rules/valid-typeof
    'valid-typeof': ['error', { requireStringLiterals: true }],
  },
};
