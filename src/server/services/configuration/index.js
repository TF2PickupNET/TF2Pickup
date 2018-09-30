// @flow

import { type ServiceDefinition } from '@feathersjs/feathers';
import { type App } from '@feathersjs/express';
import debug from 'debug';

// $FlowFixMe: Weirdly this is untyped
import pkg from '../../../../package.json';
import { type Config } from '../../../types/configuration';
import DefaultService from '../DefaultService';

const log = debug('TF2Pickup:configuration');

class ConfigurationService extends DefaultService implements ServiceDefinition<Config> {
  config: Config = { version: pkg.version };

  get() {
    return Promise.resolve(this.config);
  }
}

export default function configuration(app: App) {
  log('Setting up configuration service');

  /**
   * Simple service for fetching some useful information about the server.
   *
   * This returns whether or not the server runs in beta mode and which version it's currently.
   */
  app.use('/configuration', new ConfigurationService());
}
