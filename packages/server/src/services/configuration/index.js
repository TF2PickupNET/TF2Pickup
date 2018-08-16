// @flow

import { type App } from '@feathersjs/express';
import debug from 'debug';
import config from 'config';

// $FlowFixMe: Weirdly this is untyped
import pkg from '../../../package.json';

const log = debug('TF2Pickup:configuration');

export default function configuration(app: App) {
  log('Setting up configuration service');

  app.use('/configuration', {
    get() {
      return Promise.resolve({
        beta: config.get('beta'),
        version: pkg.version,
      });
    },
  });
}
