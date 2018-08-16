// @flow strict-local

import { type FeathersError } from '@featherjs/errors';

import { type User } from '../../packages/types/src/user';

declare module '@feathersjs/feathers' {
  declare export type SKIP = Symbol;
  declare export type Method = 'find' | 'get' | 'create' | 'update' | 'patch' | 'remove';
  declare export type HookType = 'before' | 'after' | 'error';

  declare export interface Connection {
    user: User,
  }

  declare export interface Params {
    query: {},
    provider: 'rest' | 'socketio' | 'primus' | void,
    user?: User,
    accessToken?: string,
    authenticated: boolean,
    connection: Connection,
  }

  declare export interface CommonHookContext<Doc> {
    +app: App,
    +service: Service<App, Doc>,
    +path: string,
    +method: Method,
    +type: HookType,
    params: Params,
    statusCode: number,
  }

  declare export interface ErrorHookContext<Doc> extends CommonHookContext<Doc> {
    +type: 'error',
    error: FeathersError<number, string>,
    result: void,
  }

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
    get(id: string, params: Params): Promise<Document>,
    find(params: Params): Promise<$ReadOnlyArray<Document>>,
    create(data: Document, params: Params): Promise<Document>,
    update(id: string, data: Document, params: Params): Promise<Document>,
    patch(id: string, data: Document, params: Params): Promise<Document>,
    remove(id: string, params: Params): Promise<{}>,

    hooks(hooks: Hooks<App>): Service<Document>,
    publish(publisher: (data: {}) => $ReadOnlyArray<Connection>): Service<Document>,
    publish(
      eventname: string,
      publisher: (data: {}) => $ReadOnlyArray<Connection>,
    ): Service<Document>,
    on(eventname: string, cb: (data: mixed) => void): Service<Document>,
    emit(eventname: string, data?: mixed): Service<Document>,
    removeListener(eventname: string, listeners: ?mixed): Service<Document>,
  }

  declare export interface App {
    channels: $ReadOnlyArray<Channel>,
    use<Document>(path: string, service: Service<App, Document>): App,
    service<Document>(path: string): Service<App, Document>,
    hooks(hooks: Hooks<App>): App,
    configure(cb: (app: App) => void): App,
    channel(name: string): Channel,
    listen(port: number): App,
    set(name: string, value: mixed): App,
    get(name: string): mixed,
    on('connection', fn: (connection: Connection) => void): App,
    on(eventname: string, cb: (data: {}, params: Params) => void): App,
    emit(eventname: string, data: ?mixed): App,
    removeListener(eventname: string, listeners: ?mixed): App,
  }

  declare export default {
    (): App,
    SKIP: SKIP,
  };
}
