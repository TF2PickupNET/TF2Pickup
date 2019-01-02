declare module '@feathersjs/feathers' {
  import { Server } from 'http';
  import { FeathersError } from '@feathersjs/errors';
  import {
    Payload,
    SocketMeta,
    Strategy,
  } from '@feathersjs/authentication';
  import { ExpressMiddleware } from '@feathersjs/express';

  export type SKIP = Symbol;
  export type Method = 'find' | 'get' | 'create' | 'update' | 'patch' | 'remove';
  export type HookType = 'before' | 'after' | 'error';

  export interface Connection {
    user: import('../../src/types/User').default,
  }

  export interface Params<Query extends object> {
    query: Query,
    provider: 'rest' | 'socketio' | 'primus' | void,
    user?: import('../../src/types/User').default,
    accessToken?: string,
    authenticated: boolean,
    connection: Connection,
  }

  export interface CommonHookContext<Document> {
    app: ServerApp,
    service: ServerService<Document>,
    path: string,
    method: Method,
    type: HookType,
    params: Params<object>,
    statusCode: number,
  }

  export interface ErrorHookContext<Document> extends CommonHookContext<Document> {
    type: 'error',
    error: FeathersError<number, string>,
    result: void,
  }

  export interface BeforeHookContext<Document> extends CommonHookContext<Document> {
    type: 'before',
    result: void,
  }

  export interface AfterHookContext<Document> extends CommonHookContext<Document> {
    type: 'after',
    dispatch: void,
  }

  export interface CreateBeforeHookContext<Document> extends BeforeHookContext<Document> {
    method: 'create',
    data: Document,
  }

  export interface CreateAfterHookContext<Document> extends AfterHookContext<Document> {
    method: 'create',
    data: Document,
    result: Document,
  }

  export interface GetBeforeHookContext<Document> extends BeforeHookContext<Document> {
    method: 'get',
    id: string,
  }

  export interface GetAfterHookContext<Document> extends AfterHookContext<Document> {
    method: 'get',
    id: string,
    result: Document,
  }

  export interface FindBeforeHookContext<Document> extends BeforeHookContext<Document> {
    method: 'find',
  }

  export interface FindAfterHookContext<Document> extends AfterHookContext<Document> {
    method: 'find',
    result: Document[],
  }

  export interface PatchBeforeHookContext<Document> extends BeforeHookContext<Document> {
    method: 'patch',
    id: string | null,
    data: {},
  }

  export interface PatchAfterHookContext<Document> extends AfterHookContext<Document> {
    method: 'patch',
    id: string | null,
    data: {},
    result: Document,
  }

  export interface RemoveBeforeHookContext<Document> extends BeforeHookContext<Document> {
    method: 'remove',
    id: string | null,
  }

  export interface RemoveAfterHookContext<Document> extends CommonHookContext<Document> {
    method: 'remove',
    id: string | null,
  }

  export type HookResult<Context> =
    | Context
    | SKIP
    | void
    | Promise<Context>
    | Promise<SKIP>
    | Promise<void>;

  export type HookFunction<Context> =
    | ((context: Context) => HookResult<Context>)
    | Array<((context: Context) => HookResult<Context>)>;

  export interface Hooks<Doc> {
    before?: {
      all?: HookFunction<BeforeHookContext<Doc>>,
      create?: HookFunction<CreateBeforeHookContext<Doc>>,
      find?: HookFunction<FindBeforeHookContext<Doc>>,
      get?: HookFunction<GetBeforeHookContext<Doc>>,
      update?: HookFunction<BeforeHookContext<Doc>>,
      patch?: HookFunction<PatchBeforeHookContext<Doc>>,
      remove?: HookFunction<RemoveBeforeHookContext<Doc>>,
    },
    after?: {
      all?: HookFunction<AfterHookContext<Doc>>,
      create?: HookFunction<CreateAfterHookContext<Doc>>,
      find?: HookFunction<FindAfterHookContext<Doc>>,
      get?: HookFunction<GetAfterHookContext<Doc>>,
      update?: HookFunction<AfterHookContext<Doc>>,
      patch?: HookFunction<PatchAfterHookContext<Doc>>,
      remove?: HookFunction<RemoveAfterHookContext<Doc>>,
    },
    error?: {
      all?: HookFunction<ErrorHookContext<Doc>>,
      create?: HookFunction<ErrorHookContext<Doc>>,
      find?: HookFunction<ErrorHookContext<Doc>>,
      get?: HookFunction<ErrorHookContext<Doc>>,
      update?: HookFunction<ErrorHookContext<Doc>>,
      patch?: HookFunction<ErrorHookContext<Doc>>,
      remove?: HookFunction<ErrorHookContext<Doc>>,
    },
  }

  export interface Channel {
    join(connection: Connection): Channel,
    leave(connection: Connection): Channel,
    leave(fn: (connection: Connection) => boolean): Channel,
    filter(fn: (connection: Connection) => boolean): Channel,
    send(data: {}): Channel,
    length: number,
    connections: Connection[],
  }

  export interface ServiceQueries<Document> {
    get(id: string): Promise<Document>,
    find(query: {
      query: Partial<Document> & {
        $limit?: number,
        $skip?: number,
      },
    }): Promise<Document[]>,
    create(data: Document): Promise<Document>,
    update(id: string, data: Partial<Document>): Promise<Document>,
    patch(id: string, data: Partial<Document>): Promise<Document>,
    remove(id: string): Promise<Document>,
  }

  export interface ServerService<Document> extends ServiceQueries<Document> {
    hooks(hooks: Hooks<Document>): ServerService<Document>,
    publish(publisher: (data: {}) => Connection[]): ServerService<Document>,
    publish(
      eventname: 'created' | 'patched' | 'removed',
      publisher: (data: Document) => Channel,
    ): ServerService<Document>,
    on(
      eventname: 'created' | 'patched' | 'removed',
      cb: (data: Document) => void,
    ): ServerService<Document>,
    removeListener(eventname: string, listeners: (data: Document) => void): ServerService<Document>,
  }

  export interface ClientService<Document> extends ServiceQueries<Document> {
    on(
      eventname: 'created' | 'patched' | 'removed',
      cb: (data: Document) => void,
    ): ClientService<Document>,
    removeListener(eventname: string, listeners: (data: Document) => void): ClientService<Document>,
  }

  export interface ServiceDefinition<Document> {
    setup?(app: ServerApp, path: string): void,
    find?(params: Params<object>): Promise<Document[]>,
    get?(id: string, params: Params<object>): Promise<Document>,
    create?(data: Document, params: Params<object>): Promise<Document>,
    update?(id: string, data: Partial<Document>, params: Params<object>): Promise<Document>,
    patch?(id: string, data: Partial<Document>, params: Params<object>): Promise<Document>,
    remove?(id: string, params: Params<object>): Promise<Document>,
  }

  interface ServerServices {
    service(name: 'configuration'): ServerService<import('../../src/types/Configuration').default>,
    service(name: 'user-profiles'): ServerService<import('../../src/types/UserProfile').default>,
    service(name: 'user-settings'): ServerService<import('../../src/types/UserSettings').default>,
    service(name: 'users'): ServerService<import('../../src/types/User').default>,
    service(name: 'pickup-queues'): ServerService<import('../../src/types/PickupQueue').default>,
    service(name: 'authentication'): ServerService<{
      payload: Record<string, string>,
      accessToken?: string,
    }>,
    service(name: 'logs'): ServerService<import('../../src/types/Log').default>,
  }

  interface ClientServices {
    service(name: 'configuration'): ClientService<import('../../src/types/Configuration').default>,
    service(name: 'user-profiles'): ClientService<import('../../src/types/UserProfile').default>,
    service(name: 'user-settings'): ClientService<import('../../src/types/UserSettings').default>,
    service(name: 'users'): ClientService<import('../../src/types/User').default>,
    service(name: 'pickup-queues'): ClientService<import('../../src/types/PickupQueue').default>,
    service(name: 'logs'): ClientService<import('../../src/types/Log').default>,
  }

  type SocketEvents = import('./socket-events').Events;
  type SocketCallback = import('./socket-events').Callback;
  type ServerSocket = import('./socket-events').ServerSocket;
  type ClientSocket = import('./socket-events').ClientSocket;

  export interface ServerApp extends ServerServices {
    configure(cb: (app: ServerApp) => void): ServerApp,
    channels: Channel[],
    use<Document>(path: string, service: ServiceDefinition<Document>): ServerApp,
    use(...middlewares: ExpressMiddleware[]): ServerApp,
    use(path: string, ...middlewares: ExpressMiddleware[]): ServerApp,
    hooks(hooks: Hooks<object>): ServerApp,
    channel(name: string): Channel,
    listen(port: number): Server,
    on(
      event: 'login',
      cb: (payload: Payload, meta: SocketMeta) => void | Promise<void>,
    ): ServerApp,
    on(
      event: 'connection',
      fn: (connection: Connection) => void | Promise<void>,
    ): ServerApp,
    on(
      event: 'socket-connection',
      cb: (socket: ServerSocket) => void| Promise<void>,
    ): ServerApp,
    on(
      event: 'logout',
      cb: (payload: Payload, meta: SocketMeta) => void | Promise<void>,
    ): ServerApp,
    on(
      event: 'listening',
      cb: () => void | Promise<void>,
    ): ServerApp,
    emit(
      event: 'socket-connection',
      data: ServerSocket,
    ): ServerApp,
    emit(event: 'listening'): ServerApp,
    passport: {
      verifyJWT(
        token: string,
        options: { secret: string },
      ): Promise<{ id: string }>,
      use(strategy: Strategy): void,
    },
  }

  export interface ClientApp extends ClientServices {
    configure(cb: (app: ClientApp) => void): ClientApp,
    authenticate(options: {
      strategy: string,
      accessToken: string,
    }): Promise<{ accessToken: string }>,
    on(
      event: 'authenticated',
      fn: (payload: { accessToken: string }) => void | Promise<void>,
    ): ClientApp,
    on(
      event: 'logout',
      fn: () => void,
    ): ClientApp,
    logout(): Promise<void>,
    passport: {
      verifyJWT(token: string): Promise<{ id: string }>,
    },
    io: ClientSocket,
  }

  export type SocketEventHandler<Name extends keyof SocketEvents> = (
    data: SocketEvents[Name],
    cb: SocketCallback,
  ) => void | Promise<void>;

  export {
    ServerSocket,
    ClientSocket,
  };

  export default function create<App>(): App;
}
