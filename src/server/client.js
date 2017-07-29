import feathers from 'feathers';
import webpackDevMiddleware from 'webpack-dev-middleware';
import path from 'path';
import fallback from 'connect-history-api-fallback';
import webpack from 'webpack';
import config from '/webpack.config';

export default function client() {
  const that = this;
  const clientPath = path.resolve(__dirname, '../../dist/client');

  that.use(fallback({ index: '/' }));


  that.use('/assets', feathers.static(path.resolve(__dirname, '../assets')));

  if (that.get('env') === 'development') {
    const compiler = webpack(config);
    that.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      stats: { colors: true },
    }));
  } else {
    that.use('/', feathers.static(clientPath));
  }
}
