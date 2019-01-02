const path = require('path');
const { NoEmitOnErrorsPlugin } = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const rules = [{
  test: /\.tsx?$/,
  exclude: /(node_modules)/,
  use: {
    loader: 'ts-loader',
    options: { transpileOnly: true },
  },
}, {
  test: /\.css$/,
  use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
  entry: { app: path.resolve(__dirname, 'src/webapp/index.tsx') },
  output: { publicPath: '/' },
  module: { rules },

  optimization,

  plugins: [
    new NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({ filename: '[name].[hash].css' }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/webapp/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      navigateFallback: '/index.html',
    }),
  ],

  resolve: {
    plugins: [new TSConfigPathsPlugin({ configFile: 'tsconfig.client.json' })],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
};
