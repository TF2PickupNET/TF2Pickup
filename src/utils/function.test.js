// @flow

import test from 'ava';
import sinon from 'sinon';

import { spreadArgs } from './function';

test('spreadArgs: should call the function with no args when an empty array is passed', (t) => {
  const func = sinon.spy(() => true);
  const result = spreadArgs(func)([]);

  t.deepEqual(result, true);
  t.deepEqual(func.callCount, 1);
  t.deepEqual(func.calledWith(), true);
});

test('spreadArgs: should call the function with the content of the array', (t) => {
  const func = sinon.spy((add1: number, add2: number) => add1 + add2);
  const result = spreadArgs(func)([1, 2]);

  t.deepEqual(result, 3);
  t.deepEqual(func.callCount, 1);
  t.deepEqual(func.calledWith(1, 2), true);
});
