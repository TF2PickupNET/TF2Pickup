// @flow strict-local

import {
  type ServerApp,
  type HookFunction,
  type Connection,
} from '@feathersjs/feathers';
import {
  type ExpressMiddleware,
  type ExpressRequest,
  type ExpressResponse,
} from '@feathersjs/express';
import { type SocketConnection } from '@feathersjs/socketio';

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

  declare export type Meta = {
    provider: 'rest',
    req: ExpressRequest,
    res: ExpressResponse,
  } | {
    provider: 'socketio' | 'primus',
    connection: Connection,
    socket: SocketConnection,
  };

  declare export type Payload = { accessToken: string };

  declare interface Authentication {
    (opts?: AuthenticationOptions): (app: ServerApp) => void,
    hooks: { authenticate(strategies: $ReadOnlyArray<string>): HookFunction<ServerApp, {}> },
    express: { authenticate(strategy: string): ExpressMiddleware },
  }

  declare export default Authentication;
}
