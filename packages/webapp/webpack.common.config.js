// @flow

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const babelConfig = require('../../babel.config');

module.exports = {
  entry: { app: path.resolve(__dirname, 'src/index.js') },

  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'build/'),
    filename: '[name].[hash].js',
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          ...babelConfig,
          plugins: [
            ...babelConfig.plugins,
            ['import', {
              libraryName: 'antd',
              style: 'css',
            }],
          ],
        },
      },
    }, {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, {
        loader: 'css-loader',
        options: { minimize: true },
      }],
    }, {
      test: /\.(png|jpg|gif|mp3|ico)$/,
      loaders: [{
        loader: 'url-loader',
        options: { limit: 8192 },
      }],
    }],
  },

  optimization: { runtimeChunk: 'single' },

  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[hash].css' }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
    new SWPrecacheWebpackPlugin({
      cacheId: 'tf2pickup-app',
      filename: 'service-worker.js',
      dontCacheBustUrlsMatching: /[\w\d]{8}/,
      minify: true,
      navigateFallback: '/index.html',
      staticFileGlobsIgnorePatterns: [/\.map$/, /manifest\.json$/],
      navigateFallbackWhitelist: [/^\/(?!auth|api)/],
    }),
  ],

  resolve: { extensions: ['.js', '.jsx'] },
};
