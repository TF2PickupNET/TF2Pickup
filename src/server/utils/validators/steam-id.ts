import SteamID from 'steamid';

import { Validator } from './types';

interface Options {
  msg?: string,
}

function steamId({ msg = '{VALUE} is not a valid Steam ID!' }: Options): Validator<string> {
  return [
    (id: string) => new SteamID(id).isValid(),
    msg,
  ];
}

export default steamId;
