// @flow

const merge = require('webpack-merge');
const convert = require('koa-connect');
const history = require('connect-history-api-fallback');

const common = require('./webpack.common.config');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',

  serve: {
    port: 8080,
    content: [__dirname],

    add(app) {
      app.use(convert(history()));
    },
  },
});

