// @flow strict-local

import { type FeathersError } from '@feathersjs/errors';
import {
  type Payload,
  type Meta,
} from '@feathersjs/authentication';

import { type User } from '../../src/types/user';
import { type Config } from '../../src/types/configuration';
import { type UserProfile } from '../../src/types/user-profile';
import { type UserSettings } from '../../src/types/user-settings';
import { type PickupQueue } from '../../src/types/pickup-queue';

import {
  type ClientSocket,
  type ServerSocket,
} from './socket-events';

declare module '@feathersjs/feathers' {
  declare export type SKIP = Symbol;
  declare export type Method = 'find' | 'get' | 'create' | 'update' | 'patch' | 'remove';
  declare export type HookType = 'before' | 'after' | 'error';

  declare export type Connection = {
    user: User,
  };

  declare export type Params<Query: {} = Object> = {
    query: Query,
    provider: 'rest' | 'socketio' | 'primus' | void,
    user?: User,
    accessToken?: string,
    authenticated: boolean,
    connection: Connection,
  };

  declare export type CommonHookContext<Doc> = {
    +app: App,
    +service: Service<Doc>,
    +path: string,
    +method: Method,
    +type: HookType,
    params: Params<>,
    statusCode: number,
  };

  declare export type ErrorHookContext<Doc> = CommonHookContext<Doc> & {
    +type: 'error',
    error: FeathersError<number, string>,
    result: void,
  };

  declare export type BeforeHookContext<Doc> = CommonHookContext<Doc> & {
    +type: 'before',
    result: void,
  };

  declare export type AfterHookContext<Doc> = CommonHookContext<Doc> & {
    +type: 'after',
    dispatch: void,
  };

  declare export type CreateBeforeHookContext<Doc> = BeforeHookContext<Doc> & {
    +method: 'create',
    data: Doc,
  };

  declare export type CreateAfterHookContext<Doc> = AfterHookContext<Doc> & {
    +method: 'create',
    data: Doc,
    result: Doc,
  };

  declare export type GetBeforeHookContext<Doc> = BeforeHookContext<Doc> & {
    +method: 'get',
    id: string,
  };

  declare export type GetAfterHookContext<Doc> = AfterHookContext<Doc> & {
    +method: 'get',
    id: string,
    result: Doc,
  };

  declare export type FindBeforeHookContext<Doc> = BeforeHookContext<Doc> & {
    +method: 'find',
  };

  declare export type FindAfterHookContext<Doc> = AfterHookContext<Doc> & {
    +method: 'find',
    result: $ReadOnlyArray<Doc>,
  };

  declare export type PatchBeforeHookContext<Doc> = BeforeHookContext<Doc> & {
    +method: 'patch',
    id: string | null,
    data: {},
  };

  declare export type PatchAfterHookContext<Doc> = AfterHookContext<Doc> & {
    +method: 'patch',
    id: string | null,
    data: {},
    result: Doc,
  };

  declare export type RemoveBeforeHookContext<Doc> = BeforeHookContext<Doc> & {
    +method: 'remove',
    id: string | null,
  };

  declare export type RemoveAfterHookContext<Doc> = AfterHookContext<Doc> & {
    +method: 'remove',
    id: string | null,
  };

  declare export type HookResult<Doc> = CommonHookContext<Doc>
    | SKIP
    | void
    | Promise<CommonHookContext<Doc>>
    | Promise<SKIP>
    | Promise<void>;

  declare export type HookFunction<Doc> = (context: CommonHookContext<Doc>) => HookResult<Doc>;

  declare export type MethodHooks<Doc, F: HookFunction<Doc>> = {
    all?: F | $ReadOnlyArray<F>,
    [key: Method]: F | $ReadOnlyArray<F>,
  };

  declare export type Hooks<Doc> = {
    [key: HookType]: HookFunction<Doc>
      | $ReadOnlyArray<HookFunction<Doc>>
      | MethodHooks<Doc>,
  };

  declare export interface Channel {
    join(connection: Connection): Channel,
    leave(connection: Connection): Channel,
    leave(fn: (connection: Connection) => boolean): Channel,
    filter(fn: (connection: Connection) => boolean): Channel,
    send(data: {}): Channel,
    length: number,
    connections: $ReadOnlyArray<Connection>,
  }

  declare export interface Service<Document> {
    get(id: string): Promise<Document>,
    find(query: {
      query: {
        $limit?: number,
        $skip?: number,
      },
    }): Promise<$ReadOnlyArray<Document>>,
    create(data: Document): Promise<Document>,
    update(id: string, data: Document): Promise<Document>,
    patch(id: string, data: Document): Promise<Document>,
    remove(id: string): Promise<Document>,

    hooks(hooks: Hooks<App>): Service<Document>,
    publish(publisher: (data: {}) => $ReadOnlyArray<Connection>): Service<Document>,
    publish(
      eventname: 'created' | 'patched' | 'remove',
      publisher: (data: Document) => $ReadOnlyArray<Connection>,
    ): Service<Document>,
    on(
      eventname: 'created' | 'patched' | 'remove',
      cb: (data: Document) => void,
    ): Service<Document>,
    removeListener(eventname: string, listeners: ?mixed): Service<Document>,
  }

  declare export interface ServiceDefinition<Document> {
    setup(app: ServerApp, path: string): void,
    find(params: Params<>): Promise<$ReadOnlyArray<Document>>,
    get(id: string, params: Params<>): Promise<Document>,
    create(data: Document, params: Params<>): Promise<Document>,
    update(id: string, data: $Shape<Document>, params: Params<>): Promise<Document>,
    patch(id: string, data: $Shape<Document>, params: Params<>): Promise<Document>,
    remove(id: string, params: Params<>): Promise<Document>,
  }

  declare interface App {
    service(path: 'configuration'): Service<Config>,
    service(path: 'user-profiles'): Service<UserProfile>,
    service(path: 'user-settings'): Service<UserSettings>,
    service(path: 'users'): Service<User>,
    service(path: 'pickup-queue'): Service<PickupQueue>,
    configure(cb: (app: App) => void): App,
    set(name: string, value: mixed): App,
    get(name: string): mixed,
    removeListener(eventname: string, listeners: ?mixed): App,
  }

  declare export interface ServerApp extends App {
    configure(cb: (app: ServerApp) => void): ServerApp,
    channels: $ReadOnlyArray<Channel>,
    use<Document>(path: string, service: ServiceDefinition<Document>): ServerApp,
    hooks(hooks: Hooks<App>): ServerApp,
    channel(name: string): Channel,
    listen(port: number): ServerApp,
    on('connection', fn: (connection: Connection) => void | Promise<void>): ServerApp,
    on('socket-connection', cb: (socket: ServerSocket) => void): ServerApp,
    on(
      'login',
      cb: (payload: Payload, meta: Meta) => Promise<void>,
    ): ServerApp,
    on(
      'logout',
      cb: (payload: Payload, meta: Meta) => Promise<void>,
    ): ServerApp,
  }

  declare export interface ClientApp extends App {
    configure(cb: (app: ClientApp) => void): ClientApp,
    set(name: string, value: mixed): ClientApp,
    get(name: string): mixed,
    authenticate(): Promise<void>,
    authenticate(options: { strategy: string }): Promise<void>,
    on('authenticated', fn: (payload: { accessToken: string }) => void | Promise<void>): ClientApp,
    on('logout', fn: () => void): ClientApp,
    logout(): Promise<void>,
    passport: {
      verifyJWT(token: string): Promise<{ id: string }>,
    },
    io: ClientSocket,
  }

  declare export default {
    <A>(): A,
    SKIP: SKIP,
  };
}
