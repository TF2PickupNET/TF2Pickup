// @flow strict-local

import { type ExpressMiddleware } from '@feathersjs/express';

import { type User } from '../../src/types/User';

declare module 'passport-steam' {
  declare type Options = {
    returnURL: string,
    realm: string,
    profile: boolean,
  };

  declare export default function Authenticator(
    options: Options,
    cb: (
      indentifier: string,
      profile: {},
      done: (err: Error | null, user: User | null) => void,
    ) => void | Promise<void>,
  ): ExpressMiddleware;
}
