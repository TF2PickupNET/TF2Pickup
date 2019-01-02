import {Validator} from "./types";

interface Options {
  msg?: string,
  nullIsAllowed?: boolean,
}

export default function oneOf<T>(array: T[], {
  msg = '{VALUE} is not a valid value!',
  nullIsAllowed = false,
}: Options): Validator {
  return [
    (value: T) => array.includes(value) || (nullIsAllowed && value === null),
    msg,
  ];
}
