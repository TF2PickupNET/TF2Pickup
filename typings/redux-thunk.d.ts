declare module 'redux-thunk' {
  import {
    Enhancer,
    Action,
  } from 'redux';

  const thunk: Enhancer<any, any>;

  export default thunk;
}
