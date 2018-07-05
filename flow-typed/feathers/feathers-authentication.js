// @flow strict-local

import {
  type App,
  type HookFunction,
} from '@feathersjs/feathers';
import { type ExpressMiddleware } from '@feathersjs/express';

declare module '@feathersjs/authentication' {
  declare type AuthenticationOptions = {
    path?: string,
    header?: string,
    entity?: string,
    service?: string,
    passReqToCallback?: boolean,
    session?: boolean,
    cookie?: {
      enabled?: boolean,
      name?: string,
      httpOnly?: boolean,
      secure?: boolean,
    },
    jwt?: {
      header?: { [key: string]: string },
      audience?: string,
      subject?: string,
      issuer?: string,
      algorithm?: string,
      expiresIn?: string,
    },
  };

  declare interface Authentication {
    (opts?: AuthenticationOptions): (app: App) => void,
    hooks: { authenticate(strategies: $ReadOnlyArray<string>): HookFunction<App, {}> },
    express: { authenticate(strategy: string): ExpressMiddleware },
  }

  declare export default Authentication;
}
