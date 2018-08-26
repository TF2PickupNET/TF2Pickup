// @flow

export function isNumber(num: mixed): %checks {
  return typeof num === 'number' && !isNaN(num);
}
