// @flow

const merge = require('webpack-merge');
const convert = require('koa-connect');
const history = require('connect-history-api-fallback');
const webpackServeWaitpage = require('webpack-serve-waitpage');

const common = require('./webpack.common.config');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',

  serve: {
    port: 8080,
    content: [__dirname],
    devMiddleware: {
      stats: {
        all: false,
        assets: true,
        builtAt: true,
        excludeAssets: /\.(mp3|jpg|png)/,
        colors: true,
        errors: true,
        errorDetails: true,
        hash: true,
        moduleTrace: true,
        timings: true,
        version: true,
        warnings: true,
      },
    },

    add(app, middleware, options) {
      app.use(webpackServeWaitpage(options));

      app.use(convert(history()));
    },
  },
});

