import gamemodes from '@tf2-pickup/configs/gamemodes';
import classes from '@tf2-pickup/configs/classes';

import {
  flatten,
  pipe,
  find,
  pluck,
} from './functions';

const aliases = flatten(
  Object.values(gamemodes),
  Object.values(classes),
);

const getAlias = string => pipe(
  find(item => item.aliases.includes(string)),
  pluck('name', string),
)(aliases);

export default getAlias;
