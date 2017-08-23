const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.common');

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.resolve(__dirname, 'src/client/index.html'),
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  devtool: 'inline-source-map',
  entry: path.resolve(__dirname, 'src/client/index.js'),
  module: { loaders: config.loaders },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    HTMLWebpackPluginConfig,
    new webpack.NamedModulesPlugin(),
  ],

  resolve: { extensions: ['.js', '.jsx'] },
};
