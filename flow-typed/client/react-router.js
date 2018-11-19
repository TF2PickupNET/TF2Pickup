// @flow

import { type Context } from 'react';
import { type ContextRouter } from 'react-router-dom';

declare module 'react-router' {
  declare export var __RouterContext: Context<ContextRouter>;
}
