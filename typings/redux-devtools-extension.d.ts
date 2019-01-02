declare module 'redux-devtools-extension' {
  import { Enhancer } from 'redux';

  export function composeWithDevTools<S, A>(middlewares: Enhancer<S, A>): Enhancer<S, A>;
}
