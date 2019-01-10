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

  // eslint-disable-next-line typescript/no-empty-interface
  interface Strategy {}

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

  interface SocketMeta {
    provider: 'socketio' | 'primus',
    connection: Connection,
    socket: SocketConnection,
  }

  interface RestMeta {
    provider: 'rest',
    req: ExpressRequest,
    res: ExpressResponse,
  }

  type Meta = RestMeta | SocketMeta;

  interface Payload { accessToken: string }

  interface AuthPayload {
    payload?: Record<string, string>,
    accessToken?: string,
  }

  interface Authentication {
    (opts?: AuthenticationOptions): (app: ServerApp) => void,
    hooks: {
      authenticate(strategies: string[]): (context: CommonHookContext<any>) => HookResult<any>,
    },
    express: { authenticate(strategy: string): ExpressMiddleware },
  }

  export {
    Payload,
    AuthPayload,
    RestMeta,
    Meta,
    SocketMeta,
    Strategy,
  };

  const auth: Authentication;

  export default auth;
}
