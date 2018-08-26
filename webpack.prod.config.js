// @flow

const merge = require('webpack-merge');
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const common = require('./webpack.common.config');

module.exports = merge(common, {
  mode: 'production',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist/webapp'),
    filename: '[name].[chunkhash].js',
  },

  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      generateStatsFile: true,
      openAnalyzer: false,
    }),
  ],
});
