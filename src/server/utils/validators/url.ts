import isUrl from 'is-url';
import {Validator} from "./types";

interface Options {
  msg?: string,
  nullIsAllowed?: boolean,
}

export default function url({
  msg = '{VALUE} is not a valid url!',
  nullIsAllowed = false,
}: Options): Validator {
  return [
    (value: string) => isUrl(value) || (nullIsAllowed && value === null),
    msg,
  ];
}
