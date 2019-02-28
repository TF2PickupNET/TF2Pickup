// eslint-disable-line max-lines
/* tslint:disable:max-file-line-count */

declare module '@feathersjs/feathers' {
  import { Server } from 'http';
  import { FeathersError } from '@feathersjs/errors';
  import {
    Payload,
    SocketMeta,
    Strategy,
    AuthPayload,
  } from '@feathersjs/authentication';
  import { RequestHandler } from '@feathersjs/express';
  import { SocketConnection } from '@feathersjs/socketio';
  import { Events } from '@typings/SocketEvents';
  import User from '@typings/User';
  import UserProfile from '@typings/UserProfile';
  import UserSettings from '@typings/UserSettings';
  import PickupQueue from '@typings/PickupQueue';
  import Configuration from '@typings/Configuration';
  import Log from '@typings/Log';
  import PickupPlayer from '@typings/PickupPlayer';
  import Pickup from '@typings/Pickup';

  type SKIP = Symbol;
  type Method = 'find' | 'get' | 'create' | 'update' | 'patch' | 'remove';
  type HookType = 'before' | 'after' | 'error';

  interface Connection {
    user: User,
  }

  interface DefaultDocument {
    id: string | number,
  }

  interface Params<Query extends object = {}> {
    query: Query,
    provider: 'rest' | 'socketio' | 'primus' | void,
    user?: User,
    accessToken?: string,
    authenticated: boolean,
    connection: Connection,
  }

  interface CommonHookContext<Document extends DefaultDocument> {
    app: ServerApp,
    service: ServerService<Document>,
    path: string,
    method: Method,
    type: HookType,
    params: Params<object>,
    statusCode: number,
  }

  interface ErrorHookContext<Document extends DefaultDocument> extends CommonHookContext<Document> {
    type: 'error',
    error: FeathersError<number, string>,
    result: never,
  }

  type BeforeHookContext<Document extends DefaultDocument> =
    | CreateBeforeHookContext<Document>
    | GetBeforeHookContext<Document>
    | FindBeforeHookContext<Document>
    | PatchBeforeHookContext<Document>
    | RemoveBeforeHookContext<Document>;

  type  AfterHookContext<Document extends DefaultDocument> =
    | CreateAfterHookContext<Document>
    | GetAfterHookContext<Document>
    | FindAfterHookContext<Document>
    | PatchAfterHookContext<Document>
    | RemoveAfterHookContext<Document>;

  interface CreateBeforeHookContext<Document extends DefaultDocument>
    extends CommonHookContext<Document> {
    type: 'before',
    method: 'create',
    data: Document,
  }

  interface CreateAfterHookContext<Document extends DefaultDocument>
    extends CommonHookContext<Document> {
    type: 'after',
    method: 'create',
    data: Document,
    result: Document,
  }

  interface GetBeforeHookContext<Document extends DefaultDocument>
    extends CommonHookContext<Document> {
    type: 'before',
    method: 'get',
    id: string,
  }

  interface GetAfterHookContext<Document extends DefaultDocument>
    extends CommonHookContext<Document> {
    type: 'after',
    method: 'get',
    id: string,
    result: Document,
  }

  interface FindBeforeHookContext<Document extends DefaultDocument>
    extends CommonHookContext<Document> {
    type: 'before',
    method: 'find',
  }

  interface FindAfterHookContext<Document extends DefaultDocument>
    extends CommonHookContext<Document> {
    type: 'after',
    method: 'find',
    result: Document[],
  }

  interface PatchBeforeHookContext<Document extends DefaultDocument>
    extends CommonHookContext<Document> {
    type: 'before',
    method: 'patch',
    id: string | null,
    data: {},
  }

  interface PatchAfterHookContext<Document extends DefaultDocument>
    extends CommonHookContext<Document> {
    type: 'after',
    method: 'patch',
    id: string | null,
    data: {},
    result: Document,
  }

  interface RemoveBeforeHookContext<Document extends DefaultDocument>
    extends CommonHookContext<Document> {
    type: 'before',
    method: 'remove',
    id: string | null,
  }

  interface RemoveAfterHookContext<Document extends DefaultDocument>
    extends CommonHookContext<Document> {
    type: 'after',
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

  type HookFunction<Context> = (context: Context) => HookResult<Context>;
  type HookFunctions<Context> = HookFunction<Context> | Array<HookFunction<Context>>;

  interface Hooks<Doc extends DefaultDocument> {
    before?: {
      all?: HookFunctions<BeforeHookContext<Doc>>,
      create?: HookFunctions<CreateBeforeHookContext<Doc>>,
      find?: HookFunctions<FindBeforeHookContext<Doc>>,
      get?: HookFunctions<GetBeforeHookContext<Doc>>,
      update?: HookFunctions<BeforeHookContext<Doc>>,
      patch?: HookFunctions<PatchBeforeHookContext<Doc>>,
      remove?: HookFunctions<RemoveBeforeHookContext<Doc>>,
    },
    after?: {
      all?: HookFunctions<AfterHookContext<Doc>>,
      create?: HookFunctions<CreateAfterHookContext<Doc>>,
      find?: HookFunctions<FindAfterHookContext<Doc>>,
      get?: HookFunctions<GetAfterHookContext<Doc>>,
      update?: HookFunctions<AfterHookContext<Doc>>,
      patch?: HookFunctions<PatchAfterHookContext<Doc>>,
      remove?: HookFunctions<RemoveAfterHookContext<Doc>>,
    },
    error?: {
      all?: HookFunctions<ErrorHookContext<Doc>>,
      create?: HookFunctions<ErrorHookContext<Doc>>,
      find?: HookFunctions<ErrorHookContext<Doc>>,
      get?: HookFunctions<ErrorHookContext<Doc>>,
      update?: HookFunctions<ErrorHookContext<Doc>>,
      patch?: HookFunctions<ErrorHookContext<Doc>>,
      remove?: HookFunctions<ErrorHookContext<Doc>>,
    },
  }

  interface Channel {
    join(connection: Connection): Channel,
    leave(fn: Connection | ((connection: Connection) => boolean)): Channel,
    filter(fn: (connection: Connection) => boolean): Channel,
    send(data: {}): Channel,
    length: number,
    connections: Connection[],
  }

  interface ServiceQueries<Document extends DefaultDocument> {
    get(id: Document['id']): Promise<Document>,
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

  interface ServiceDefinition<Document extends DefaultDocument> {
    setup?(app: ServerApp, path: string): void,
    find?(params: Params<object>): Promise<Document[]>,
    get?(id: Document['id'], params: Params<object>): Promise<Document>,
    create?(data: Document, params: Params<object>): Promise<Document>,
    update?(id: string, data: Partial<Document>, params: Params<object>): Promise<Document>,
    patch?(id: string, data: Partial<Document>, params: Params<object>): Promise<Document>,
    remove?(id: string, params: Params<object>): Promise<Document>,
  }

  interface ServerService<Document  extends DefaultDocument> extends ServiceQueries<Document> {
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

  interface ClientService<Document extends DefaultDocument> extends ServiceQueries<Document> {
    on(
      eventname: 'created' | 'patched' | 'removed',
      cb: (data: Document) => void,
    ): ClientService<Document>,
    removeListener(eventname: string, listeners: (data: Document) => void): ClientService<Document>,
  }

  interface ServerServices {
    service(name: 'configuration'): ServerService<Configuration>,
    service(name: 'user-profiles'): ServerService<UserProfile>,
    service(name: 'user-settings'): ServerService<UserSettings>,
    service(name: 'users'): ServerService<User>,
    service(name: 'pickup-queues'): ServerService<PickupQueue>,
    service(name: 'pickup-players'): ServerService<PickupPlayer>,
    service(name: 'authentication'): ServerService<AuthPayload>,
    service(name: 'logs'): ServerService<Log>,
    service(name: 'pickups'): ServerService<Pickup>,
  }

  interface ClientServices {
    service(name: 'configuration'): ClientService<Configuration>,
    service(name: 'user-profiles'): ClientService<UserProfile>,
    service(name: 'user-settings'): ClientService<UserSettings>,
    service(name: 'pickup-players'): ServerService<PickupPlayer>,
    service(name: 'users'): ClientService<User>,
    service(name: 'pickup-queues'): ClientService<PickupQueue>,
    service(name: 'logs'): ClientService<Log>,
    service(name: 'pickups'): ClientService<Pickup>,
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
    use<Document extends DefaultDocument>(
      path: string,
      service: ServiceDefinition<Document>,
    ): ServerApp,
    use(...middlewares: RequestHandler[]): ServerApp,
    use(path: string, ...middlewares: RequestHandler[]): ServerApp,
    hooks(hooks: Hooks<DefaultDocument>): ServerApp,
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
      createJWT(payload: Record<string, string>, options: { secret: string }): Promise<string>,
      use<Options extends object>(strategy: Strategy<Options>): void,
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

  /**
   * Exports for feathers-hooks-common typings.
   */
  // @ts-ignore
  type HookContext<Doc extends any = any> = CommonHookContext<Doc>;
  type Hook = <Context extends CommonHookContext<any>>(context: Context) => HookResult<Context>;
  type Query = Record<string, string>;
  type Application = ServerApp;
  interface Paginated<Data> {
    total: number,
    limit: number,
    skip: number,
    data: Data[],
  }

  export {
    HookContext,
    Hook,
    Application,
    Query,
    Paginated,

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
    DefaultDocument,

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
}
