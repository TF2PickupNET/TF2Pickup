// @flow strict-local

import path from 'path';
import fs from 'fs';
import shell from 'shelljs';
import format from 'date-fns/format';
import { promisify } from 'util';

import pkg from '../package.json';
import {
  regions,
  gamemodes,
  mapTypes,
} from '../src/config';
import readFile from '../src/utils/read-file';

const writeFile = promisify(fs.writeFile);
const src = path.join(__dirname, '../src/tf2configs');
const dist = path.join(__dirname, '../dist/tf2configs');

/**
 * A function which returns an array of string to append to the configuration file if it hasn't been
 * called by another file.
 *
 * @param {Object} file - The parsed file information.
 * @returns {String[]} - Returns an array of strings.
 */
function appendTextToFile(file) {
  const [region, gamemode, config = null] = file.name.split('_');
  const configDisplay = config === null ? '' : ` ${mapTypes[config].display}`;

  return [
    `say * TF2Pickup.net ${gamemodes[gamemode].display}${configDisplay} Config Loaded.`,
    `say * TF2Pickup Version: ${pkg.version}`,
    `say * Version Date: ${format(new Date(), 'DD.MM.YYYY')}`,
    `say * Region: ${regions[region].fullName}`,
    'say * Please check that the settings are correct for this game mode!',
    'say * You must follow the rules, ignoring them will result in a ban!',
    'say * If there is a problem, do not hesitate to contact anyone from the TF2Pickup.net team.',
  ];
}

/**
 * A function to compile a file.
 *
 * @param {String} filePath - The path of the file.
 * @param {Boolean} [root] - If the file has been called by our main compile function so we append
 * some text to the file.
 * @returns {String} - Returns the new content for the file.
 */
async function compileFile(filePath, root = false) {
  const fileData = path.parse(filePath);
  const content = await readFile(filePath);
  const lines = content.split('\n');
  const processedLines = await Promise.all(
    lines.map((line) => {
      if (/^exec\s.+$/.test(line)) {
        return compileFile(`${fileData.dir}/${line.split(' ')[1]}.cfg`);
      }

      return line;
    })
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

shell.mkdir('dist/tf2configs');

const files = shell
  .find('./src/tf2configs')
  .map(file => path.parse(file).base)
  .filter((file) => {
    if (!file.endsWith('.cfg')) {
      return false;
    }

    const [region, gamemode, mapType = null] = file.replace('.cfg', '').split('_');

    return file.endsWith('.cfg')
      && regions[region]
      && gamemodes[gamemode]
      && gamemodes[gamemode].mapTypes.includes(mapType);
  });

async function buildConfigs() {
  // eslint-disable-next-line fp/no-loops
  for (const file of files) {
    // eslint-disable-next-line no-await-in-loop
    const compiledFile = await compileFile(path.join(src, file), true);

    // eslint-disable-next-line no-await-in-loop
    await writeFile(path.join(dist, file), compiledFile, 'utf-8');
  }
}

buildConfigs();
