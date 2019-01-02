import SteamID from 'steamid';
import {Validator} from "./types";

interface Options {
  msg?: string,
  nullIsAllowed?: boolean,
}

export default function steamId({ msg = '{VALUE} is not a valid Steam ID!' }: Options): Validator {
  return [
    (id: string) => new SteamID(id).isValid(),
    msg,
  ];
}
