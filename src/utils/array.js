// @flow

import { undef } from './utils';

function flatten([x, ...rest]: $ReadOnlyArray<mixed>) {
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

export { flatten };
