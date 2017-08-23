module.exports = {
  loaders: [{
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loaders: ['babel-loader'],
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
};
