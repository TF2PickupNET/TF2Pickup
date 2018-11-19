// @flow

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SWPreCacheWebpackPlugin = require('sw-precache-webpack-plugin');

const babelConfig = require('./babel.client.config');

const rules = [{
  test: /\.jsx?$/,
  exclude: /(node_modules)/,
  use: {
    loader: 'babel-loader',
    options: babelConfig,
  },
}, {
  test: /\.css$/,
  use: [MiniCssExtractPlugin.loader, {
    loader: 'css-loader',
    options: { minimize: true },
  }],
}, {
  test: /\.(png|jpg|gif|mp3|ico)$/,
  use: 'file-loader',
}, {
  test: /\.woff(2)?(\?v=\d\.\d\.\d)?$/,
  loader: 'url-loader?limit=10000&mimetype=application/font-woff',
}, {
  test: /\.(ttf|eot|svg)(\?v=\d\.\d\.\d)?$/,
  loader: 'file-loader',
}];
const optimization = {
  noEmitOnErrors: true,
  splitChunks: {
    cacheGroups: {
      // Cache the node_modules
      vendors: {
        chunks: 'all',
        test: /node_modules/,
        name: 'vendors',
      },

      styles: {
        // Bundle all of the css into one file
        name: 'styles',
        test: /\.css$/,
        chunks: 'all',
        enforce: true,
      },
    },
  },
  // Generate a single runtime chunk for better caching
  runtimeChunk: 'single',
};

module.exports = {
  entry: { app: path.resolve(__dirname, 'src/webapp/index.js') },
  output: { publicPath: '/' },
  module: { rules },

  optimization,

  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[hash].css' }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/webapp/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
    new SWPreCacheWebpackPlugin({
      cacheId: 'tf2pickup-app',
      filename: 'service-worker.js',
      minify: true,
      navigateFallback: '/index.html',
      staticFileGlobsIgnorePatterns: [/\.map$/, /manifest\.json$/],
      navigateFallbackWhitelist: [/^\/(?!auth)/],
    }),
  ],

  resolve: { extensions: ['.js', '.jsx'] },
};
