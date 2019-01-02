import { ServiceDefinition, ServerApp } from '@feathersjs/feathers';
import debug from 'debug';

import pkg from '../../../../package.json';
import Configuration from '../../../types/Configuration';

const log = debug('TF2Pickup:configuration');

class ConfigurationService implements ServiceDefinition<Configuration> {
  config: Configuration = { version: pkg.version };

  get() {
    return Promise.resolve(this.config);
  }
}

export default function configuration() {

  return (app: ServerApp) => {
    log('Setting up configuration service');

    /**
     * Simple service for fetching some useful information about the server.
     *
     * This returns whether or not the server runs in beta mode and which version it's currently.
     */
    app.use('/configuration', new ConfigurationService());
  };
}
