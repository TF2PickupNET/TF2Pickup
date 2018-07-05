// @flow strict-local

declare module 'sinon' {
  declare interface Spy<R, A> {
    (...args: $ReadOnlyArray<A>): R,
    callCount: number,
    called: boolean,
    notCalled: boolean,
    args: $ReadOnlyArray<$ReadOnlyArray<A>>,
    calledWith(...args: $ReadOnlyArray<A>): boolean,
    threw(): boolean,
  }

  declare export default {
    spy<R, A>(fn?: Function): Spy<R, A>, // eslint-disable-line flowtype/no-weak-types
  };
}
