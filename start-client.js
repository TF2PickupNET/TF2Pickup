const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const express = require('express');
const config = require('./webpack.config.js');

const server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
});

server.app.use('/assets', express.static('node_modules/tf2pickup-assets/assets/src'));

server.listen(8080);
