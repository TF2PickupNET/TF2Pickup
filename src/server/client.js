import feathers from 'feathers';
import webpackDevMiddleware from 'webpack-dev-middleware';
import path from 'path';
import fallback from 'connect-history-api-fallback';
import webpack from 'webpack';

import config from '../../webpack.config.dev';

/**
 * Set up the client code.
 * Either add the webpack dev middleware or host the client code.
 */
export default function client() {
  const that = this;

  that.use(fallback({ index: '/' }));

  that.use('/assets', feathers.static(path.resolve(__dirname, '../assets')));

  if (that.get('env') === 'development') {
    const compiler = webpack(config);

    that.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      stats: { colors: true },
    }));
  } else {
    const clientPath = path.resolve(__dirname, '../client');

    that.use('/', feathers.static(clientPath));
  }
}
