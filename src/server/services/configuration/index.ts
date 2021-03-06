import {
  ServiceDefinition,
  ServerApp,
} from '@feathersjs/feathers';
import debug from 'debug';
import Configuration from '@typings/Configuration';

import pkg from '../../../../package.json';

const log = debug('TF2Pickup:configuration');

class ConfigurationService implements ServiceDefinition<Configuration> {
  private readonly config: Configuration = {
    id: 'config',
    version: pkg.version,
  };

  public get() {
    return Promise.resolve(this.config);
  }
}

export default function configuration(app: ServerApp) {
  log('Setting up configuration service');

  /**
   * Simple service for fetching some useful information about the server.
   *
   * This returns whether or not the server runs in beta mode and which version it's currently.
   */
  app.use('/configuration', new ConfigurationService());
}
