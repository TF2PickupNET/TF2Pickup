import path from 'path';
import readFile from '@utils/read-file';
import regions from '@config/regions';
import gamemodes from '@config/gamemodes';
import configTypes from '@config/config-types';
import {
  flatten,
  NestedArray,
} from '@utils/array';

import pkg from '../../../../package.json';

import { Config } from '.';
import { getNameForConfig } from './utils';

function appendTextToFile(config: Config) {
  const configDisplay = config.configType ? ` ${configTypes[config.configType].display}` : '';

  return [
    `say * TF2Pickup.net ${gamemodes[config.gamemode].display}${configDisplay} Config Loaded.`,
    `say * TF2Pickup Version: ${pkg.version}`,
    `say * Region: ${regions[config.region].fullName}`,
    'say * Please check that the settings are correct for this game mode!',
    'say * You must follow the rules, ignoring them will result in a ban!',
    'say * If there is a problem, do not hesitate to contact anyone from the TF2Pickup.net team.',
  ];
}

const EXEC_CONFIG_REGEX = /^exec\s+(.+)$/;

const getConfigPath = (filename: string) => path.join(
  process.cwd(), `tf2configs/${filename}.cfg`,
);

async function compileFile(filename: string): Promise<NestedArray<string>> {
  const content = await readFile(getConfigPath(filename));

  return Promise.all(
    content.split('\n').map(async (line) => {
      const match = line.match(EXEC_CONFIG_REGEX);

      if (match) {
        const lines = await compileFile(match[1]);

        return lines;
      }

      return line;
    }),
  );
}

export async function compileConfig(config: Config): Promise<string> {
  const lines = await compileFile(getNameForConfig(config));

  return [
    ...flatten(lines),
    'mp_tournament_restart',
    '',
    ...appendTextToFile(config),
  ].join('\n');
}

