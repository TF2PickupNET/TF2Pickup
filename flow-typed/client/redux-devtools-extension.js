// @flow strict-local

import { type Enhancer } from 'redux';

declare module 'redux-devtools-extension' {
  declare export function composeWithDevTools(middlewares: Enhancer<>): Enhancer<>;
}
