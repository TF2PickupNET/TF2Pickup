module.exports = {
  rules: {
    // http://eslint.org/docs/rules/accessor-pairs
    'accessor-pairs': ['error', {
      setWithoutGet: true,
      getWithoutSet: false,
    }],

    // http://eslint.org/docs/rules/array-callback-return
    'array-callback-return': 'error',

    // http://eslint.org/docs/rules/block-scoped-var
    'block-scoped-var': 'error',

    // http://eslint.org/docs/rules/class-methods-use-this
    'class-methods-use-this': ['error', {
      exceptMethods: [
        'render',
        'getInitialState',
        'getDefaultProps',
        'getChildContext',
        'componentWillMount',
        'componentDidMount',
        'componentWillReceiveProps',
        'shouldComponentUpdate',
        'componentWillUpdate',
        'componentDidUpdate',
        'componentWillUnmount',
      ],
    }],

    // http://eslint.org/docs/rules/complexity
    complexity: ['error', { max: 12 }],

    // http://eslint.org/docs/rules/consistent-return
    'consistent-return': ['error', { treatUndefinedAsUnspecified: false }],

    // http://eslint.org/docs/rules/curly
    curly: ['error', 'all'],

    // http://eslint.org/docs/rules/default-case
    'default-case': 'error',

    // http://eslint.org/docs/rules/dot-location
    'dot-location': ['error', 'property'],

    // http://eslint.org/docs/rules/dot-notation
    'dot-notation': ['error', {
      allowKeywords: true,
      allowPattern: '^w+((.|-)w+)+$',
    }],

    // http://eslint.org/docs/rules/eqeqeq
    eqeqeq: ['error', 'always'],

    // http://eslint.org/docs/rules/guard-for-in
    'guard-for-in': 'error',

    // http://eslint.org/docs/rules/no-alert
    'no-alert': 'error',

    // http://eslint.org/docs/rules/no-caller
    'no-caller': 'error',

    // http://eslint.org/docs/rules/no-case-declarations
    'no-case-declarations': 'error',

    // http://eslint.org/docs/rules/no-div-regex
    'no-div-regex': 'error',

    // http://eslint.org/docs/rules/no-else-return
    'no-else-return': 'error',

    // http://eslint.org/docs/rules/no-empty-function
    // We allow arrow functions so we can have default values for functions
    'no-empty-function': ['error', { allow: ['arrowFunctions'] }],

    // http://eslint.org/docs/rules/no-empty-pattern
    'no-empty-pattern': 'error',

    // http://eslint.org/docs/rules/no-eq-null
    'no-eq-null': 'error',

    // http://eslint.org/docs/rules/no-eval
    'no-eval': ['error', { allowIndirect: false }],

    // http://eslint.org/docs/rules/no-extend-native
    'no-extend-native': 'error',

    // http://eslint.org/docs/rules/no-extra-bind
    'no-extra-bind': 'error',

    // http://eslint.org/docs/rules/no-extra-label
    'no-extra-label': 'error',

    // http://eslint.org/docs/rules/no-fallthrough
    'no-fallthrough': 'error',

    // http://eslint.org/docs/rules/no-floating-decimal
    'no-floating-decimal': 'error',

    // http://eslint.org/docs/rules/no-global-assign
    'no-global-assign': 'error',

    // http://eslint.org/docs/rules/no-implicit-coercion
    'no-implicit-coercion': ['error', {
      boolean: true,
      string: true,
      number: true,
      allow: [],
    }],

    // http://eslint.org/docs/rules/no-implicit-globals
    'no-implicit-globals': 'error',

    // http://eslint.org/docs/rules/no-implied-eval
    'no-implied-eval': 'error',

    // http://eslint.org/docs/rules/no-invalid-this
    'no-invalid-this': 'off',

    // http://eslint.org/docs/rules/no-iterator
    'no-iterator': 'error',

    // http://eslint.org/docs/rules/no-labels
    'no-labels': ['error', {
      allowLoop: false,
      allowSwitch: false,
    }],

    // http://eslint.org/docs/rules/no-lone-blocks
    'no-lone-blocks': 'error',

    // http://eslint.org/docs/rules/no-loop-func
    'no-loop-func': 'error',

    // http://eslint.org/docs/rules/no-magic-numbers
    'no-magic-numbers': 'off',

    // http://eslint.org/docs/rules/no-multi-spaces
    'no-multi-spaces': ['error', { exceptions: { Property: false } }],

    // http://eslint.org/docs/rules/no-multi-str
    'no-multi-str': 'error',

    // http://eslint.org/docs/rules/no-new-func
    'no-new-func': 'error',

    // http://eslint.org/docs/rules/no-new-wrappers
    'no-new-wrappers': 'error',

    // http://eslint.org/docs/rules/no-new
    'no-new': 'error',

    // http://eslint.org/docs/rules/no-octal-escape
    'no-octal-escape': 'error',

    // http://eslint.org/docs/rules/no-octal
    'no-octal': 'error',

    // http://eslint.org/docs/rules/no-param-reassign
    'no-param-reassign': ['error', { props: true }],

    // http://eslint.org/docs/rules/no-proto
    'no-proto': 'error',

    // http://eslint.org/docs/rules/no-redeclare
    'no-redeclare': ['error', { builtinGlobals: true }],

    // http://eslint.org/docs/rules/no-restricted-properties
    'no-restricted-properties': ['error'],

    // http://eslint.org/docs/rules/no-return-assign
    'no-return-assign': ['error', 'always'],

    // http://eslint.org/docs/rules/no-return-await
    'no-return-await': 'error',

    // http://eslint.org/docs/rules/no-script-url
    'no-script-url': 'error',

    // http://eslint.org/docs/rules/no-self-assign
    'no-self-assign': ['error', { props: true }],

    // http://eslint.org/docs/rules/no-self-compare
    'no-self-compare': 'error',

    // http://eslint.org/docs/rules/no-sequences
    'no-sequences': 'error',

    // http://eslint.org/docs/rules/no-throw-literal
    'no-throw-literal': 'error',

    // http://eslint.org/docs/rules/no-unmodified-loop-condition
    'no-unmodified-loop-condition': 'error',

    // http://eslint.org/docs/rules/no-unused-expressions
    'no-unused-expressions': ['error', {
      allowShortCircuit: false,
      allowTernary: false,
    }],

    // http://eslint.org/docs/rules/no-unused-labels
    'no-unused-labels': 'error',

    // http://eslint.org/docs/rules/no-useless-call
    'no-useless-call': 'error',

    // http://eslint.org/docs/rules/no-useless-concat
    'no-useless-concat': 'error',

    // http://eslint.org/docs/rules/no-useless-escape
    'no-useless-escape': 'error',

    // http://eslint.org/docs/rules/no-useless-return
    'no-useless-return': 'error',

    // http://eslint.org/docs/rules/no-void
    'no-void': 'error',

    // http://eslint.org/docs/rules/no-warning-comments
    'no-warning-comments': ['error', {
      location: 'start',
      terms: ['fixme', 'fix', 'todo'],
    }],

    // http://eslint.org/docs/rules/no-with
    'no-with': 'error',

    // http://eslint.org/docs/rules/prefer-promise-reject-errors
    'prefer-promise-reject-errors': ['error', { allowEmptyReject: false }],

    // http://eslint.org/docs/rules/radix
    radix: ['error', 'always'],

    // http://eslint.org/docs/rules/require-await
    'require-await': 'error',

    // http://eslint.org/docs/rules/vars-on-top
    'vars-on-top': 'error',

    // http://eslint.org/docs/rules/wrap-iife
    'wrap-iife': ['error', 'inside', { functionPrototypeMethods: true }],

    // http://eslint.org/docs/rules/yoda
    yoda: ['error', 'never', {
      exceptRange: true,
      onlyEquality: true,
    }],
  },
};
