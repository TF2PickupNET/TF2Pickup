declare module '@feathersjs/authentication' {
  import {
    ServerApp,
    Connection,
    HookResult,
    CommonHookContext,
  } from '@feathersjs/feathers';
  import {
    ExpressMiddleware,
    ExpressRequest,
    ExpressResponse,
  } from '@feathersjs/express';
  import { SocketConnection } from '@feathersjs/socketio';

  export interface Strategy {}

  interface AuthenticationOptions {
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
  }

  export interface SocketMeta {
    provider: 'socketio' | 'primus',
    connection: Connection,
    socket: SocketConnection,
  }

  export interface RestMeta {
    provider: 'rest',
    req: ExpressRequest,
    res: ExpressResponse,
  }

  export type Meta = RestMeta | SocketMeta;

  export interface Payload { accessToken: string }
  
  export interface AuthPayload {
    payload?: Record<string, string>,
    accessToken?: string,
  }

  export interface Authentication {
    (opts?: AuthenticationOptions): (app: ServerApp) => void,
    hooks: {
      authenticate(strategies: string[]): (context: CommonHookContext<any>) => HookResult<any>,
    },
    express: { authenticate(strategy: string): ExpressMiddleware },
  }

  const auth: Authentication;

  export default auth;
}
