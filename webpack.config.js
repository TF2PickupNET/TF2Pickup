const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.resolve(__dirname, 'src/client/index.html'),
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  devtool: 'inline-source-map',
  entry: path.resolve(__dirname, 'src/client/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist/client'),
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader'],
    }, {
      test: /\.css$/,
      loaders: [
        'style-loader',
        'css-loader',
      ],
    }, {
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      loader: 'file-loader',
    }],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    HTMLWebpackPluginConfig,
    new webpack.NamedModulesPlugin(),
  ],

  resolve: { extensions: ['.js', '.jsx'] },
};
