declare module 'react-router' {
  import { Context } from 'react';
  import { ContextRouter } from 'react-router-dom';

  export const __RouterContext: Context<ContextRouter>;
}
