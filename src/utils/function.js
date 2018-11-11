// @flow

function isFunc(func: mixed): %checks {
  return typeof func === 'function';
}

export { isFunc };
