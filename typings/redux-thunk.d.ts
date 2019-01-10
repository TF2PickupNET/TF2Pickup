declare module 'redux-thunk' {
  import { Enhancer } from 'redux';

  const thunk: Enhancer<any, any>;

  export default thunk;
}
