import feathers from 'feathers';
import webpackDevMiddleware from 'webpack-dev-middleware';
import path from 'path';
import fallback from 'connect-history-api-fallback';
import gzipStatic from 'connect-gzip-static';
import webpack from 'webpack';

import config from '../../webpack.config.dev';

/**
 * Set up the client code.
 * Either add the webpack dev middleware or host the client code.
 */
export default function client() {
  const that = this;

  // When no previous
  that.use(fallback({ index: '/' }));

  // Serve the assets under /assets
  that.use('/assets', feathers.static(path.resolve(__dirname, '../assets')));

  if (that.get('env') === 'development') {
    // Use the webpack middleware in dev mode to recompile when a file changes
    that.use(webpackDevMiddleware(webpack(config), {
      noInfo: true,
      stats: { colors: true },
    }));
  } else {
    // Serve the client code and when possible, serve gzipped files
    that.use('/', gzipStatic(path.resolve(__dirname, '../client')));
  }
}
