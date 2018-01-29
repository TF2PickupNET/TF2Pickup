import path from 'path';
import fs from 'fs';
import { format } from 'date-fns';
import {
  regions,
  gamemodes,
} from '@tf2-pickup/config';
import fse from 'fs-extra';

/**
 * A function which returns an array of string to append to the config file if it hasn't been
 * called by another file.
 *
 * @param {Object} file - The parsed file information.
 * @returns {String[]} - Returns an array of strings.
 */
function appendTextToFile(file) {
  const [regionName, gamemodeName, configName] = file.name.split('_');

  if (regions[regionName] || gamemodes[gamemodeName]) {
    return [];
  }

  const region = regions[regionName].fullName;
  const gamemode = gamemodes[gamemodeName].display;
  const config = ['6v6', '9v9'].includes(gamemodeName) ? ` ${configName.toUpperCase()}` : '';

  return [
    `say * TF2Pickup.net ${gamemode}${config} Config Loaded.`,
    `say * Version Date: ${format(new Date(), 'DD.MM.YYYY')}`,
    `say * Region: ${region}`,
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
function compileFile(filePath, root = false) {
  const fileData = path.parse(filePath);

  return fs
    .readFileSync(filePath, 'utf-8')
    .split('\n')
    .map((line) => {
      if (/^exec\s.+$/.test(line)) {
        return compileFile(`${fileData.dir}/${line.split(' ')[1]}.cfg`);
      }

      return line;
    })
    .concat(root ? [
      'mp_tournament_restart',
      '',
    ] : [])
    .concat(root ? appendTextToFile(fileData) : [])
    .join('\n');
}

(async () => {
  await fse.ensureDir('dist/');

  await fse.emptyDir('dist/');

  fs.readdirSync('./src/')
    .map(file => path.parse(file).base)
    .filter((file) => {
      if (/^(oc|eu|na)_(bball|ultiduo)\.cfg$/.test(file)) {
        return true;
      }

      return /^(oc|eu|na)_(6v6|9v9)_(5cp|koth|stopwatch)\.cfg$/.test(file);
    })
    .forEach((file) => {
      fs.writeFileSync(
        `dist/tf2pickup_${file}`,
        compileFile(`./src/${file}`, true),
        'utf-8',
      );
    });
})();

fse.ensureDir('dist/');
