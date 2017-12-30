import feathers from 'feathers';
import webpackDevMiddleware from 'webpack-dev-middleware';
import path from 'path';
import fallback from 'connect-history-api-fallback';
import gzipStatic from 'connect-gzip-static';
import webpack from 'webpack';
import debug from 'debug';

import config from '../../webpack.config.dev';

const log = debug('TF2Pickup:client');

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

  if (that.get('env') === 'dev') {
    log('Setting up webpack dev middleware');

    // Use the webpack middleware in dev mode to recompile when a file changes
    that.use(webpackDevMiddleware(webpack(config), {
      noInfo: true,
      lazy: true,
      logLevel: 'silent',
      stats: { colors: true },
      reporter({
        state,
        stats,
      }) {
        if (state) {
          if (stats.hasErrors()) {
            log('Error while building client');
            log(stats.toString());
          } else if (stats.hasWarnings()) {
            log('Warning while building client');
            log(stats.toString());
          } else {
            log('Finished building client');
          }
        } else {
          log('Rebuilding client');
        }
      },
    }));
  } else {
    log('Serving client code');
    // Serve the client code and when possible, serve gzipped files
    that.use('/', gzipStatic(path.resolve(__dirname, '../client')));
  }
}
