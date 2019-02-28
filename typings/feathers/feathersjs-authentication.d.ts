declare module '@feathersjs/authentication' {
  import {
    ServerApp,
    Connection,
    HookResult,
    DefaultDocument,
    BeforeHookContext,
  } from '@feathersjs/feathers';
  import {
    Request,
    Response,
    RequestHandler,
  } from '@feathersjs/express';
  import { SocketConnection } from '@feathersjs/socketio';

  interface Strategy<Options extends object> {
    authenticate(req: Request, options: object): void,
  }

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
      header?: Record<string, string>,
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
    req: Request,
    res: Response,
  }

  type Meta = RestMeta | SocketMeta;

  interface Payload { accessToken: string }

  interface AuthPayload extends DefaultDocument {
    id: string,
    payload?: Record<string, string>,
    accessToken?: string,
  }

  interface Authentication {
    (opts?: AuthenticationOptions): (app: ServerApp) => void,
    hooks: {
      authenticate(strategies: string[]): <
        Document extends DefaultDocument,
        Context extends BeforeHookContext<Document>,
      >(context: Context) => HookResult<Context>,
    },
    express: { authenticate(strategy: string): RequestHandler },
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
