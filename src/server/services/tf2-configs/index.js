// @flow

// eslint-disable-next-line filenames/match-exported
import { type App } from '@feathersjs/express';
import debug from 'debug';
import fs from 'fs';
import path from 'path';
import {
  type ServiceDefinition,
  type Params,
} from '@feathersjs/feathers';
import {
  BadRequest,
  NotFound,
} from '@feathersjs/errors';
import { promisify } from 'util';

import {
  gamemodes,
  regions,
} from '../../../config';
import DefaultService from '../DefaultService';
import { isString } from '../../../utils';

type TF2Config = { config: string };
type Query = {
  region?: string,
  gamemode?: string,
  configType?: string | null,
};

const log = debug('TF2Pickup:tf2-configs');
const readFile = promisify(fs.readFile);
const dir = path.join(__dirname, '../../../../../dist/tf2configs');

class TF2ConfigsService extends DefaultService implements ServiceDefinition<TF2Config> {
  validateOptions({
    region,
    gamemode,
    configType,
  }) {
    if (!regions[region]) {
      return new BadRequest(`Invalid region: ${region}`);
    }

    if (!gamemodes[gamemode]) {
      return new BadRequest(`Invalid gamemode: ${region}`);
    }

    const validConfigTypes = gamemodes[gamemode].mapTypes;

    if (!validConfigTypes.includes(configType)) {
      return new BadRequest(
        `Invalid config type for gamemode: ${configType === null ? 'No type' : configType}`
      );
    }

    return null;
  }

  async find({ query }: Params<Query>) {
    const region = query.region;
    const gamemode = query.gamemode;
    const configType = query.configType;

    if (!isString(region)
      || !isString(gamemode)
      || (!isString(configType) && configType !== null)
    ) {
      throw new BadRequest();
    }

    const validationError = this.validateOptions({
      region,
      gamemode,
      configType,
    });

    if (validationError !== null) {
      throw validationError;
    }

    const fileName = configType === null
      ? `${region}_${gamemode}.cfg`
      : `${region}_${gamemode}_${configType}.cfg`;

    try {
      return await readFile(path.join(dir, fileName));
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new NotFound(`Couldn't find config file: ${fileName}`);
      }

      throw error;
    }
  }

  get(id, params) {
    const [region, gamemode, configType = null] = id.split('_');

    return this.find({
      ...params,
      query: {
        region,
        gamemode,
        configType,
      },
    });
  }
}

export default function tf2Configs(app: App) {
  log('Setting up tf2-configs service');

  /**
   * Simple service for fetching some useful information about the server.
   *
   * This returns whether or not the server runs in beta mode and which version it's currently.
   */
  app.use('/tf2-configs', new TF2ConfigsService());
}
