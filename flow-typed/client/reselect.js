// @flow

declare module 'reselect' {
  /**
   * Selectors with two inputs.
   * @param input1
   * @param result
   */
  declare export function createSelector<A1, A2, C, Return>(
    input1: (arg1: A1, arg2: A2) => C,
    result: (arg: C) => Return,
  ): (arg: A1, arg2: A2) => Return;

  declare export function createSelector<A1, A2, S1, S2, Return>(
    input1: (arg1: A1, arg2: A2) => S1,
    input2: (arg1: A1, arg2: A2) => S2,
    result: (arg1: S1, arg2: S2) => Return,
  ): (arg: A1, arg2: A2) => Return;

  declare export function createSelector<A1, A2, S1, S2, S3, Return>(
    input1: (arg1: A1, arg2: A2) => S1,
    input2: (arg1: A1, arg2: A2) => S2,
    input3: (arg1: A1, arg2: A2) => S3,
    result: (arg1: S1, arg2: S2, arg3: S3) => Return,
  ): (arg: A1, arg2: A2) => Return;

  /**
   * Selectors with three inputs.
   */
  declare export function createSelector<A1, A2, A3, C, Return>(
    input1: (arg1: A1, arg2: A2, arg3: A3) => C,
    result: (arg: C) => Return,
  ): (arg: A1, arg2: A2, arg3: A3) => Return;

  declare export function createSelector<A1, A2, A3, S1, S2, Return>(
    input1: (arg1: A1, arg2: A2, arg3: A3) => S1,
    input2: (arg1: A1, arg2: A2, arg3: A3) => S2,
    result: (arg1: S1, arg2: S2, arg3: A3) => Return,
  ): (arg: A1, arg2: A2, arg3: A3) => Return;

  declare export function createSelector<A1, A2, A3, S1, S2, S3, Return>(
    input1: (arg1: A1, arg2: A2, arg3: A3) => S1,
    input2: (arg1: A1, arg2: A2, arg3: A3) => S2,
    input3: (arg1: A1, arg2: A2, arg3: A3) => S3,
    result: (arg1: S1, arg2: S2, arg3: S3) => Return,
  ): (arg: A1, arg2: A2, arg3: A3) => Return;
}
