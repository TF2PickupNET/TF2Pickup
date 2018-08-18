// @flow

// eslint-disable-next-line filenames/match-exported
import { type App } from '@feathersjs/express';
import debug from 'debug';
import fs from 'fs';
import path from 'path';
import {
  BadRequest,
  NotFound,
} from '@feathersjs/errors';
import { promisify } from 'util';

import {
  gamemodes,
  mapTypes,
  regions,
} from '../../../config';

const log = debug('TF2Pickup:tf2-configs');
const readFile = promisify(fs.readFile);
const dir = path.join(__dirname, '../../../../../dist/tf2configs');

function validateConfig(file) {
  const [
    region,
    gamemode,
    mapType = null,
  ] = file.split('_');

  if (!regions[region]) {
    throw new BadRequest(`Invalid region: ${region}`);
  }

  if (!gamemodes[gamemode]) {
    throw new BadRequest(`Invalid gamemode: ${region}`);
  }

  if (!mapTypes[mapType] && mapType !== null) {
    throw new BadRequest(`Invalid map type: ${mapType}`);
  }

  const validMapTypes = gamemodes[gamemode].mapTypes;

  if (!validMapTypes.includes(mapType)) {
    throw new BadRequest(
      `Invalid map type for gamemode: ${mapType === null ? 'No type' : mapType}`
    );
  }
}

export default function tf2Configs(app: App) {
  log('Setting up tf2-configs service');

  /**
   * Simple service for fetching some useful information about the server.
   *
   * This returns whether or not the server runs in beta mode and which version it's currently.
   */
  app.use('/tf2-configs', {
    async get(file) {
      try {
        validateConfig(file);

        const filePath = path.join(dir, `${file}.cfg`);
        const content = await readFile(filePath);

        return content;
      } catch (error) {
        if (error.code === 'ENOENT') {
          throw new NotFound(`Couldn't find config file: ${file}`);
        }

        throw error;
      }
    },
  });
}
