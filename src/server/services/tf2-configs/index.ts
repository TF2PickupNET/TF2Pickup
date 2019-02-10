// eslint-disable-next-line filenames/match-exported
import debug from 'debug';
import {
  ServiceDefinition,
  ServerApp,
} from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import gamemodes from '@config/gamemodes';
import regions from '@config/regions';
import configTypes from '@config/config-types';
import { compileConfig } from '@server/services/tf2-configs/compile-config';

interface TF2Config {
  config: string,
}

interface Config {
  region: keyof typeof regions,
  gamemode: keyof typeof gamemodes,
  configType: keyof typeof configTypes | null,
}

const log = debug('TF2Pickup:tf2-configs');

function parseConfigId(id: string): Config | null {
  const [region, gamemode, configType = null] = id.split('_');
  const isValidConfigType = configType === null || configType in configTypes;

  if (region in regions && gamemode in gamemodes && isValidConfigType) {
    const config = {
      region,
      gamemode,
      configType,
    };

    return config as Config;
  }

  return null;
}

class TF2ConfigsService implements ServiceDefinition<TF2Config> {
  private readonly cache = new Map();

  public async get(id: string) {
    const cachedConfig = this.cache.get(id);

    if (cachedConfig) {
      return cachedConfig;
    }

    const configInfo = parseConfigId(id);

    if (configInfo === null) {
      throw new BadRequest(`Error while parsing id for ${id}`);
    }

    const config = await compileConfig(configInfo);

    this.cache.set(id, config);

    return { config };
  }
}

export { Config };

export default function tf2Configs() {
  return (app: ServerApp) => {
    log('Setting up tf2-configs service');

    /**
     * Simple service for fetching some useful information about the server.
     *
     * This returns whether or not the server runs in beta mode and which version it's currently.
     */
    app.use('/tf2-configs', new TF2ConfigsService());
  };
}
