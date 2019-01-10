import path, { ParsedPath } from 'path';
import fs from 'fs';
import shell from 'shelljs';
import { format } from 'date-fns';
import { promisify } from 'util';
import debug from 'debug';

import pkg from '../package.json';
import readFile from '../src/utils/read-file';
import regions from '../src/config/regions';
import gamemodes from '../src/config/gamemodes';
import configTypes from '../src/config/config-types';

const writeFile = promisify(fs.writeFile);
const src = path.join(__dirname, '../src/tf2configs');
const dist = path.join(__dirname, '../dist/tf2configs');
const log = debug('TF2Pickup:build-configs');

interface ConfigInfo {
  region: keyof typeof regions,
  gamemode: keyof typeof gamemodes,
  configType: keyof typeof configTypes | null,
}

type ConfigInfos = [keyof typeof regions, keyof typeof gamemodes, keyof typeof configTypes | null];

function getInfoForFile(file: string): ConfigInfo | null {
  const [region, gamemode, configType = null] = file.split('_') as ConfigInfos;
  const validConfigType = configType === null || configType in configTypes;

  if (region in regions && gamemode in gamemodes && validConfigType) {
    return {
      region,
      gamemode,
      configType,
    };
  }

  return null;
}

function appendTextToFile(file: ParsedPath) {
  const info = getInfoForFile(file.name);

  if (info === null) {
    return [];
  }

  const configDisplay = info.configType ? ` ${configTypes[info.configType].display}` : '';

  return [
    `say * TF2Pickup.net ${gamemodes[info.gamemode].display}${configDisplay} Config Loaded.`,
    `say * TF2Pickup Version: ${pkg.version}`,
    `say * Version Date: ${format(Date.now(), 'DD.MM.YYYY')}`,
    `say * Region: ${regions[info.region].fullName}`,
    'say * Please check that the settings are correct for this game mode!',
    'say * You must follow the rules, ignoring them will result in a ban!',
    'say * If there is a problem, do not hesitate to contact anyone from the TF2Pickup.net team.',
  ];
}

async function compileFile(filePath: string, root = false): Promise<string> {
  const fileData = path.parse(filePath);
  const content = await readFile(filePath);
  const lines = content.split('\n');
  const processedLines = await Promise.all(
    lines.map((line) => {
      if (/^exec\s.+$/.test(line)) {
        return compileFile(`${fileData.dir}/${line.split(' ')[1]}.cfg`);
      }

      return line;
    }),
  );

  return [
    ...processedLines,
    ...root ? [
      'mp_tournament_restart',
      '',
    ] : [],
    ...root ? appendTextToFile(fileData) : [],
  ].join('\n');
}

async function buildConfigs() {
  shell.mkdir('build/tf2configs');

  const files = shell
    .find('./src/tf2configs')
    .map((file: string) => path.parse(file).base)
    .filter((file: string) => {
      if (!file.endsWith('.cfg')) {
        return false;
      }

      const info = getInfoForFile(file.replace('.cfg', ''));

      if (info === null) {
        return false;
      }

      return gamemodes[info.gamemode].mapTypes.includes(info.configType);
    });

  await Promise.all(files.map(async (file: string) => {
    try {
      const compiledFile = await compileFile(path.join(src, file), true);

      await writeFile(path.join(dist, file), compiledFile, 'utf-8');
    } catch (error) {
      log('Error while building config:', { data: { file } });
    }
  }));
}

buildConfigs();
