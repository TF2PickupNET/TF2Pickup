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
    // Serve the client code
    that.use('/', feathers.static(path.resolve(__dirname, '../client')));

    // When the user requests a javascript file, we serve the gzipped file to the user
    that.get('*.js', (req, res, next) => {
      req.url += '.gz'; // eslint-disable-line no-param-reassign

      res.set('Content-Encoding', 'gzip');

      next();
    });
  }
}
