// eslint-disable-next-line filenames/match-exported
import debug from 'debug';
import path from 'path';
import {
  ServiceDefinition,
  ServerApp,
} from '@feathersjs/feathers';
import {
  BadRequest,
  NotFound,
} from '@feathersjs/errors';
import gamemodes from '@config/gamemodes';
import regions from '@config/regions';
import { isString } from '@utils/string';
import readFile from '@utils/read-file';

interface TF2Config {
  config: string,
}

interface Query {
  region?: string,
  gamemode?: string,
  configType?: string | null,
}

const log = debug('TF2Pickup:tf2-configs');
const dir = path.join(__dirname, '../../../../../dist/tf2configs');

function validateOptions(options: Query) {
  const {
    region,
    gamemode,
    configType,
  } = options;

  if (!isString(region) || !(region in regions)) {
    throw new BadRequest(`Invalid region: ${region}`);
  }

  if (!isString(gamemode) || !(gamemode in gamemodes)) {
    throw new BadRequest(`Invalid gamemode: ${gamemode}`);
  }

  // @ts-ignore
  const validConfigTypes = gamemodes[gamemode].mapTypes;

  if (!validConfigTypes.includes(configType)) {
    throw new BadRequest(
      `Invalid config type for gamemode: ${configType === null ? 'No type' : configType}`,
    );
  }
}

const TF2ConfigsService: ServiceDefinition<TF2Config> = {
  async get(id: string) {
    const [region, gamemode, configType = null] = id.split('_');

    validateOptions({
      region,
      gamemode,
      configType,
    });

    const fileName = configType === null
      ? `${region}_${gamemode}.cfg`
      : `${region}_${gamemode}_${configType}.cfg`;

    try {
      const config = await readFile(path.join(dir, fileName));

      return { config };
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new NotFound(`Couldn't find config file: ${fileName}`);
      }

      throw error;
    }
  },
};

export default function tf2Configs() {
  return (app: ServerApp) => {
    log('Setting up tf2-configs service');

    /**
     * Simple service for fetching some useful information about the server.
     *
     * This returns whether or not the server runs in beta mode and which version it's currently.
     */
    app.use('/tf2-configs', TF2ConfigsService);
  };
}
