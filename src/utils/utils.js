// @flow

const def = (x: mixed) => typeof x !== 'undefined';

const undef = (x: mixed) => typeof x === 'undefined';

export {
  def,
  undef,
};
