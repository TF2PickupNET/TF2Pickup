// eslint-disable-line max-lines
declare module '@feathersjs/feathers' {
  import { Server } from 'http';
  import { FeathersError } from '@feathersjs/errors';
  import {
    Payload,
    SocketMeta,
    Strategy,
  } from '@feathersjs/authentication';
  import { ExpressMiddleware } from '@feathersjs/express';
  import { SocketConnection } from '@feathersjs/socketio';

  import { Events } from '@typings/SocketEvents';
  import User from '@typings/User';
  import UserProfile from '@typings/UserProfile';
  import UserSettings from '@typings/UserSettings';
  import PickupQueue from '@typings/PickupQueue';
  import Configuration from '@typings/Configuration';
  import Log from '@typings/Log';
  import PickupPlayer from '@typings/PickupPlayer';

  type SKIP = Symbol;
  type Method = 'find' | 'get' | 'create' | 'update' | 'patch' | 'remove';
  type HookType = 'before' | 'after' | 'error';

  interface Connection {
    user: User,
  }

  interface Params<Query extends object = {}> {
    query: Query,
    provider: 'rest' | 'socketio' | 'primus' | void,
    user?: User,
    accessToken?: string,
    authenticated: boolean,
    connection: Connection,
  }

  interface CommonHookContext<Document> {
    app: ServerApp,
    service: ServerService<Document>,
    path: string,
    method: Method,
    type: HookType,
    params: Params<object>,
    statusCode: number,
  }

  interface ErrorHookContext<Document> extends CommonHookContext<Document> {
    type: 'error',
    error: FeathersError<number, string>,
    result: void,
  }

  interface BeforeHookContext<Document> extends CommonHookContext<Document> {
    type: 'before',
    result: void,
  }

  interface AfterHookContext<Document> extends CommonHookContext<Document> {
    type: 'after',
    dispatch: void,
  }

  interface CreateBeforeHookContext<Document> extends BeforeHookContext<Document> {
    method: 'create',
    data: Document,
  }

  interface CreateAfterHookContext<Document> extends AfterHookContext<Document> {
    method: 'create',
    data: Document,
    result: Document,
  }

  interface GetBeforeHookContext<Document> extends BeforeHookContext<Document> {
    method: 'get',
    id: string,
  }

  interface GetAfterHookContext<Document> extends AfterHookContext<Document> {
    method: 'get',
    id: string,
    result: Document,
  }

  interface FindBeforeHookContext<Document> extends BeforeHookContext<Document> {
    method: 'find',
  }

  interface FindAfterHookContext<Document> extends AfterHookContext<Document> {
    method: 'find',
    result: Document[],
  }

  interface PatchBeforeHookContext<Document> extends BeforeHookContext<Document> {
    method: 'patch',
    id: string | null,
    data: {},
  }

  interface PatchAfterHookContext<Document> extends AfterHookContext<Document> {
    method: 'patch',
    id: string | null,
    data: {},
    result: Document,
  }

  interface RemoveBeforeHookContext<Document> extends BeforeHookContext<Document> {
    method: 'remove',
    id: string | null,
  }

  interface RemoveAfterHookContext<Document> extends CommonHookContext<Document> {
    method: 'remove',
    id: string | null,
  }

  type HookResult<Context> =
    | Context
    | SKIP
    | void
    | Promise<Context>
    | Promise<SKIP>
    | Promise<void>;

  type HookFunction<Context> =
    | ((context: Context) => HookResult<Context>)
    | Array<((context: Context) => HookResult<Context>)>;

  interface Hooks<Doc> {
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

  interface Channel {
    join(connection: Connection): Channel,
    leave(connection: Connection): Channel,
    leave(fn: (connection: Connection) => boolean): Channel,
    filter(fn: (connection: Connection) => boolean): Channel,
    send(data: {}): Channel,
    length: number,
    connections: Connection[],
  }

  interface ServiceQueries<Document> {
    get(id: string): Promise<Document>,
    find(query: {
      query: Partial<Document> & {
        $limit?: number,
        $skip?: number,
        $sort?: Partial<Record<keyof Document, 1 | -1>>,
      },
    }): Promise<Document[]>,
    create(data: Document): Promise<Document>,
    update(id: string, data: Partial<Document>): Promise<Document>,
    patch(id: string, data: Partial<Document>): Promise<Document>,
    remove(id: string): Promise<Document>,
  }

  interface ServerService<Document> extends ServiceQueries<Document> {
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

  interface ClientService<Document> extends ServiceQueries<Document> {
    on(
      eventname: 'created' | 'patched' | 'removed',
      cb: (data: Document) => void,
    ): ClientService<Document>,
    removeListener(eventname: string, listeners: (data: Document) => void): ClientService<Document>,
  }

  interface ServiceDefinition<Document> {
    setup?(app: ServerApp, path: string): void,
    find?(params: Params<object>): Promise<Document[]>,
    get?(id: string, params: Params<object>): Promise<Document>,
    create?(data: Document, params: Params<object>): Promise<Document>,
    update?(id: string, data: Partial<Document>, params: Params<object>): Promise<Document>,
    patch?(id: string, data: Partial<Document>, params: Params<object>): Promise<Document>,
    remove?(id: string, params: Params<object>): Promise<Document>,
  }

  interface ServerServices {
    service(name: 'configuration'): ServerService<Configuration>,
    service(name: 'user-profiles'): ServerService<UserProfile>,
    service(name: 'user-settings'): ServerService<UserSettings>,
    service(name: 'users'): ServerService<User>,
    service(name: 'pickup-queues'): ServerService<PickupQueue>,
    service(name: 'pickup-players'): ServerService<PickupPlayer>,
    service(name: 'authentication'): ServerService<{
      payload: Record<string, string>,
      accessToken?: string,
    }>,
    service(name: 'logs'): ServerService<Log>,
  }

  interface ClientServices {
    service(name: 'configuration'): ClientService<Configuration>,
    service(name: 'user-profiles'): ClientService<UserProfile>,
    service(name: 'user-settings'): ClientService<UserSettings>,
    service(name: 'pickup-players'): ServerService<PickupPlayer>,
    service(name: 'users'): ClientService<User>,
    service(name: 'pickup-queues'): ClientService<PickupQueue>,
    service(name: 'logs'): ClientService<Log>,
  }

  type SocketCallback = (err: FeathersError<number, string> | null) => void;

  interface ClientSocket {
    on(event: 'connect' | 'disconnect', cb: () => void): void,

    emit<Name extends keyof Events>(
      name: Name,
      data: Events[Name],
      cb: SocketCallback,
    ): void,
  }

  interface ServerSocket extends SocketConnection {
    on<Name extends keyof Events>(
      name: Name,
      handler: (data: Events[Name], cb: SocketCallback) => void | Promise<void>,
    ): void,
  }


  interface ServerApp extends ServerServices {
    configure(cb: (app: ServerApp) => void): ServerApp,
    channels: Channel[],
    use<Document>(path: string, service: ServiceDefinition<Document>): ServerApp,
    use(...middlewares: ExpressMiddleware[]): ServerApp,
    use(path: string, ...middlewares: ExpressMiddleware[]): ServerApp,
    hooks(hooks: Hooks<object>): ServerApp,
    channel(name: string): Channel,
    listen(port: number): Server,
    on(
      event: 'login' | 'logout',
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

  interface ClientApp extends ClientServices {
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

  type SocketEventHandler<Name extends keyof Events> = (
    data: Events[Name],
    cb: SocketCallback,
  ) => void | Promise<void>;

  export {
    SocketEventHandler,
    ServerSocket,
    ClientSocket,
    ClientApp,
    ServerApp,
    ServiceDefinition,
    ClientService,
    ServerService,
    ServiceQueries,
    Channel,
    SKIP,
    Connection,
    Params,

    Hooks,
    HookResult,
    HookFunction,

    CommonHookContext,

    ErrorHookContext,
    BeforeHookContext,
    AfterHookContext,

    CreateBeforeHookContext,
    PatchBeforeHookContext,
    RemoveBeforeHookContext,
    FindBeforeHookContext,
    GetBeforeHookContext,

    CreateAfterHookContext,
    PatchAfterHookContext,
    RemoveAfterHookContext,
    FindAfterHookContext,
    GetAfterHookContext,
  };

  export default function create<App>(): App;

  /**
   * Exports for feathers-hooks-common typings.
   */
  export type HookContext<Doc = any> = CommonHookContext<Doc>;
  export type Hook = (context: any) => HookResult<any>;
  export type Query = Record<string, string>;
  export type Application = ServerApp;
  export interface Paginated<Data> {
    total: number;
    limit: number;
    skip: number;
    data: Data[];
  }
}
