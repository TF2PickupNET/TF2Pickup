const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.resolve(__dirname, 'src/client/index.html'),
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: { app: path.resolve(__dirname, 'src/client/index.js') },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
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
              debug: true,
              loose: true,
            }],
            'react',
          ],
          env: {
            production: {
              plugins: [
                ['transform-react-remove-prop-types', {
                  mode: 'remove',
                  removeImport: true,
                  ignoreFilenames: ['node_modules/materialize-react']
                }],
              ],
            },
          },
          plugins: [
            'transform-class-properties',
            'transform-export-extensions',
            ['transform-object-rest-spread', { useBuiltIns: true }],
          ],
        },
      },
    }, {
      test: /\.css$/,
      loaders: [
        'style-loader',
        { loader: 'css-loader', options: { minimize: true } },
      ],
    }, {
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      loader: 'file-loader',
    }],
  },

  plugins: [
    HTMLWebpackPluginConfig,
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],

  resolve: { extensions: ['.js', '.jsx'] },
};
