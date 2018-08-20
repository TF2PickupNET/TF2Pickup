// @flow

import { undef } from './utils';

export function flatten([x, ...rest]) {
  if (undef(x)) {
    return [];
  }

  if (Array.isArray(x)) {
    return [
      ...flatten(x),
      ...flatten(rest),
    ];
  }

  return [
    x,
    ...flatten(rest),
  ];
}
