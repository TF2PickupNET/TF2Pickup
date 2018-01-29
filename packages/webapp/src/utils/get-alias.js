import { gamemodes } from '@tf2-pickup/config';
import {
  pipe,
  find,
  pluck,
} from '@tf2-pickup/utils';

const getAlias = string => pipe(
  Object.values,
  find(item => item.aliases.includes(string)),
  pluck('name', string),
)(gamemodes);

export default getAlias;
