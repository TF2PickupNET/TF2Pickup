// @flow

import { type App } from '@feathersjs/express';
import debug from 'debug';
import config from 'config';

// $FlowFixMe: Weirdly this is untyped
import pkg from '../../../../package.json';

const log = debug('TF2Pickup:configuration');

export default function configuration(app: App) {
  log('Setting up configuration service');

  /**
   * Simple service for fetching some useful information about the server.
   *
   * This returns whether or not the server runs in beta mode and which version it's currently.
   */
  app.use('/configuration', {
    get() {
      return Promise.resolve({
        beta: config.get('beta'),
        version: pkg.version,
      });
    },
  });
}
