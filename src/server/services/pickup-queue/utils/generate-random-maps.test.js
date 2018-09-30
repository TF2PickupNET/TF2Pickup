// @flow

import test from 'ava';

import { getRandomItems } from './generate-random-maps';

test('tttt', (t) => {
  const arr = getRandomItems(['1', '2', '3'], 3);

  t.true(arr.includes('1'));
  t.true(arr.includes('2'));
  t.true(arr.includes('3'));
  t.deepEqual(arr.length, 3);
});
