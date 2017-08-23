const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.common');
const BabiliPlugin = require('babili-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.resolve(__dirname, 'src/client/index.html'),
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: path.resolve(__dirname, 'src/client/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist/client'),
    filename: 'bundle.[chunkhash].js',
  },
  module: { loaders: config.loaders },
  plugins: [
    process.env.analyze ? new BundleAnalyzerPlugin() : () => {},
    new webpack.NoEmitOnErrorsPlugin(),
    HTMLWebpackPluginConfig,
    new webpack.NamedModulesPlugin(),
    new BabiliPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
    new webpack.ContextReplacementPlugin(
      // The path to directory which should be handled by this plugin
      /moment[/\\]locale/,
      // A regular expression matching files that should be included
      /(en-gb)\.js/
    ),
  ],

  resolve: { extensions: ['.js', '.jsx'] },
};
