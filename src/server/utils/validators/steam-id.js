// @flow

import SteamID from 'steamid';

type Options = {
  msg?: string,
  nullIsAllowed?: boolean,
};

export default function steamId({ msg = '{VALUE} is not a valid Steam ID!' }: Options) {
  return [
    (id: string) => new SteamID(id).isValid(),
    msg,
  ];
}
