/* eslint-disable import/no-commonjs, camelcase  */

const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { colors } = require('materialize-react');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const config = require('config');

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.resolve(__dirname, 'src/client/index.html'),
  filename: 'index.html',
  inject: 'body',
});
const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

module.exports = {
  entry: { app: path.resolve(__dirname, 'src/client/index.js') },
  output: { publicPath: '/' },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            ['env', {
              targets: {
                chrome: 62,
                firefox: 55,
                edge: 15,
                safari: 11,
              },
              modules: false,
              loose: true,
              useBuiltIns: true,
            }],
            'react',
          ],
          plugins: [
            'transform-class-properties',
            'transform-export-extensions',
            ['transform-object-rest-spread', { useBuiltIns: true }],
          ],
        },
      },
    }, {
      test: /\.css$/,
      loaders: ['style-loader', {
        loader: 'css-loader',
        options: { minimize: true },
      }],
    }, {
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      loader: 'file-loader',
    }, {
      test: /\.(png|jpg|gif|mp3|ico)$/,
      loaders: [{
        loader: 'url-loader',
        options: { limit: 8192 },
      }],
    }],
  },

  plugins: [
    HTMLWebpackPluginConfig,
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      IS_DEV: JSON.stringify(env === 'dev'),
      BETA_MODE: config.get('beta'),
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new WebpackPwaManifest({
      name: 'TF2Pickup',
      short_name: 'TF2Pickup',
      description: 'Pickup system for TF2',
      background_color: colors.blue500,
      theme_color: colors.blue500,
      'theme-color': colors.blue500,
      start_url: '/',
      icons: [{
        src: path.resolve(__dirname, '../assets/images/icons/logo.png'),
        sizes: [64, 128, 256, 512, 1024],
      }],
    }),
  ],

  resolve: { extensions: ['.js', '.jsx'] },
};
