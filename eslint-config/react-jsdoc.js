module.exports = {
  settings: {
    'react-jsdoc': {
      optimizeForReact: true,
      disableJSDocForReactMethods: ['render'],
      onlyRequireDescriptionForReact: [
        'componentWillMount',
        'componentWillReceiveProps',
        'componentDidMount',
        'componentWillUpdate',
        'componentDidUpdate',
        'componentDidUnmount',
        'shouldComponentUpdate',
        'getChildContext',
        '/^handle.+/',
      ],
    },
  },

  rules: {
    'react-jsdoc/description': ['error', {
      requireDescription: true,
      newlineAfterDescription: true,
      validSentence: true,
      noUnnecessaryNewLine: true,
    }],

    'react-jsdoc/param-tag': ['error', {
      require: true,
      requireType: true,
      requireOptional: true,
      requireRepeatable: true,
      requireDescription: true,
      validSentence: true,
      hyphenBeforeDescription: true,
    }],

    'react-jsdoc/prefer-tag': ['error', {
      return: 'returns',
      arg: 'param',
      argument: 'argument',
      constructor: 'class',
      augments: 'extends',
      constant: 'const',
      fires: 'emits',
      exception: 'throws',
    }],

    'react-jsdoc/require-jsdoc': ['error', {
      FunctionDeclaration: true,
      ArrowFunction: 'with-body',
      MethodDefinition: true,
      PropertyFunction: false,
      ClassDeclaration: true,
    }],

    'react-jsdoc/require-tags': ['error', { class: ['class'] }],

    'react-jsdoc/return-tag': ['error', {
      require: 'as-needed',
      requireDescription: true,
      hyphenBeforeDescription: true,
      requireType: true,
      validSentence: true,
    }],

    'react-jsdoc/sort-tags': ['error', {
      order: [
        'everything-else',
        'param',
        'returns',
      ],
    }],

    'react-jsdoc/valid-tags': 'error',

    'react-jsdoc/types': ['error', {
      validate: true,
      preferTypes: {
        boolean: 'Boolean',
        string: 'String',
        array: 'Array',
        object: 'Object',
        number: 'Number',
        function: 'Function',
      },
    }],
  },
};
