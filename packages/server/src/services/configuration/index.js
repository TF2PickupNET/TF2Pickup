// @flow

import { type App } from '@feathersjs/express';
import config from 'config';

import pkg from '../../../package.json';

export default function configuration(app: App) {
  app.use('/configuration', {
    async get() {
      return {
        beta: config.get('beta'),
        version: pkg.version,
      };
    },
  });
}
