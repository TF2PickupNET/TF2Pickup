// @flow

import is from 'is_js';

type Options = {
  msg?: string,
  nullIsAllowed?: boolean,
};

export default function url({
  msg = '{VALUE} is not a valid url!',
  nullIsAllowed = false,
}: Options) {
  return [
    (value: string) => is.url(value) || (nullIsAllowed && value === null),
    msg,
  ];
}
