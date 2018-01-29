import path from 'path';
import globFS from 'glob-fs';
import debug from 'debug';
import fs from 'fs-extra';
import { format } from 'date-fns';
import {
  add,
  flatten,
  map,
  pipe,
  reduce,
  spreadArgs,
} from '@tf2-pickup/utils';

const startText = `
#######################
# Start of the log file
#######################

`;

/**
 * Change the debug log to write the lines to a file when in production mode.
 */
export default async function setupDebug() {
  await fs.ensureDir(path.join(__dirname, '../../logs'));

  const files = await globFS().readdirPromise('./logs/*.log');

  const lastLogName = pipe(
    map(path.parse),
    map(file => file.name),
    spreadArgs(Math.max),
    add(1),
  )([...files, '/0.log']);

  const filePath = `./logs/${lastLogName}.log`;

  await fs.ensureFile(filePath);

  await fs.writeFile(filePath, startText);

  debug.log = async (...messages) => {
    const message = pipe(
      map((item) => {
        if (typeof item === 'string') {
          return item;
        }

        return JSON.stringify(item, null, '\t');
      }),
      map((item, index) => {
        if (index === 0) {
          const [
            date,
            level,
            ...rest
          ] = item.split(' ');

          return [
            `[${format(date, 'DD.MM.YYYY | HH:mm')}]`,
            `[${level}]`,
            ...rest,
          ];
        }

        return item;
      }),
      flatten,
      reduce((current, str) => `${current} ${str}`, ''),
      str => str.trim(),
      str => `${str}\n`,
    )(messages);

    await fs.appendFile(
      filePath,
      message,
    );
  };
}
