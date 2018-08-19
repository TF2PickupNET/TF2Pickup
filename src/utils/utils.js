// @flow

const def = (x: mixed): %checks => typeof x !== 'undefined';

const undef = (x: mixed): %checks => typeof x === 'undefined';

export {
  def,
  undef,
};
