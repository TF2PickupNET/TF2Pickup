import { Validator } from './types';

interface Options {
  msg?: string,
  nullIsAllowed?: boolean,
}

export default function oneOf<Item>(array: Item[], {
  msg = '{VALUE} is not a valid value!',
  nullIsAllowed = false,
}: Options): Validator<Item | null> {
  return [
    value => (value === null ? nullIsAllowed : array.includes(value)),
    msg,
  ];
}
