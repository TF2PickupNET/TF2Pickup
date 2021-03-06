const { WatchIgnorePlugin, NamedModulesPlugin } = require('webpack');
const merge = require('webpack-merge');
const convert = require('koa-connect');
const history = require('connect-history-api-fallback');
const webpackServeWaitPage = require('webpack-serve-waitpage');

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
      app.use(webpackServeWaitPage(options));

      app.use(convert(history()));
    },
  },

  plugins: [
    new WatchIgnorePlugin([
      /\.js$/,
      /\.d\.ts$/,
    ]),
    new NamedModulesPlugin(),
  ],
});

