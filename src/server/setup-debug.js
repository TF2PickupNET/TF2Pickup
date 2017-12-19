import path from 'path';
import globFS from 'glob-fs';
import debug from 'debug';
import fs from 'fs-extra';
import { format } from 'date-fns';

import {
  add,
  map,
  pipe,
  spreadArgs,
} from '../utils/functions';

const startText = `
#######################
# Start of the log file
#######################

`;

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
    const [
      date,
      namespace,
      ...rest
    ] = messages[0].split(' ');
    const formattedDate = format(date, 'DD.M.YYYY | HH:mm');

    await fs.appendFile(
      filePath,
      `[${formattedDate}] [${namespace}] ${rest.join(' ')} ${messages.slice(1).join(' ')}\n`,
    );
  };
}
