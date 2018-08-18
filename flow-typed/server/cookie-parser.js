// @flow

import { type ExpressMiddleware } from '@feathersjs/express';

declare module 'cookie-parser' {
  declare export default function cookieParser(): ExpressMiddleware;
}
