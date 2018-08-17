// @flow

import isUrl from 'is-url';

type Options = {
  msg?: string,
  nullIsAllowed?: boolean,
};

export default function url({
  msg = '{VALUE} is not a valid url!',
  nullIsAllowed = false,
}: Options) {
  return [
    (value: string) => isUrl(value) || (nullIsAllowed && value === null),
    msg,
  ];
}
