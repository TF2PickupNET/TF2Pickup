module.exports = {
  rules: {
    // https://github.com/selaux/eslint-plugin-filenames#consistent-filenames-via-regex-match-regex
    'filenames/match-regex': ['error', '^[a-z0-9-.]+(.spec)?$'],

    // https://github.com/selaux/eslint-plugin-filenames#matching-exported-values-match-exported
    'filenames/match-exported': ['error', 'kebab'],

    // https://github.com/selaux/eslint-plugin-filenames#dont-allow-indexjs-files-no-index
    'filenames/no-index': 'off',
  },
};
