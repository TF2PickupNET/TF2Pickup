// @flow strict-local

import { type FeathersError } from '@featherjs/errors';

import { type User } from '../../packages/types/src/user';

declare module '@feathersjs/feathers' {
  declare export type SKIP = Symbol;
  declare export type Method = 'find' | 'get' | 'create' | 'update' | 'patch' | 'remove';
  declare export type HookType = 'before' | 'after' | 'error';

  declare interface Connection {}

  declare export interface Params {
    query: {},
    provider: 'rest' | 'socketio' | 'primus' | void,
    user?: User,
    accessToken?: string,
    authenticated: boolean,
    connection: Connection,
  }

  declare export type CommonHookContext<App, Doc> = {
    +app: App,
    +service: Service<App, Doc>,
    +path: string,
    +method: Method,
    +type: HookType,
    params: Params,
    statusCode: number,
  };

  declare export type ErrorHookContext<App, Doc> = CommonHookContext<App, Doc> & {
    +type: 'error',
    error: FeathersError<number, string>,
    result: void,
  };

  declare export type BeforeHookContext<App, Doc> = CommonHookContext<App, Doc> & {
    +type: 'before',
    result: void,
  };

  declare export type AfterHookContext<App, Doc> = CommonHookContext<App, Doc> & {
    +type: 'after',
    dispatch: void,
  };

  declare export type CreateBeforeHookContext<App, Doc> = BeforeHookContext<App, Doc> & {
    +method: 'create',
    data: Doc,
  };

  declare export type CreateAfterHookContext<App, Doc> = AfterHookContext<App, Doc> & {
    +method: 'create',
    data: Doc,
    result: Doc,
  };

  declare export type GetBeforeHookContext<App, Doc> = BeforeHookContext<App, Doc> & {
    +method: 'get',
    id: string,
  };

  declare export type GetAfterHookContext<App, Doc> = AfterHookContext<App, Doc> & {
    +method: 'get',
    id: string,
    result: Doc,
  };

  declare export type FindBeforeHookContext<App, Doc> = BeforeHookContext<App, Doc> & {
    +method: 'find',
  };

  declare export type FindAfterHookContext<App, Doc> = AfterHookContext<App, Doc> & {
    +method: 'find',
    result: $ReadOnlyArray<Doc>,
  };

  declare export type PatchBeforeHookContext<App, Doc> = BeforeHookContext<App, Doc> & {
    +method: 'patch',
    id: string | null,
    data: {},
  };

  declare export type PatchAfterHookContext<App, Doc> = AfterHookContext<App, Doc> & {
    +method: 'patch',
    id: string | null,
    data: {},
    result: Doc,
  };

  declare export type RemoveBeforeHookContext<App, Doc> = BeforeHookContext<App, Doc> & {
    +method: 'remove',
    id: string | null,
  };

  declare export type RemoveAfterHookContext<App, Doc> = AfterHookContext<App, Doc> & {
    +method: 'remove',
    id: string | null,
  };

  declare export type HookResult<App, Doc> = CommonHookContext<App, Doc>
    | SKIP
    | void
    | Promise<CommonHookContext<App, Doc>>
    | Promise<SKIP>
    | Promise<void>;

  declare export type HookFunction<App, Doc> = (context: CommonHookContext<App, Doc>)
    => HookResult<App, Doc>;

  declare export type MethodHooks<App, Doc, F: HookFunction<App, Doc>> = {
    all?: F | $ReadOnlyArray<F>,
    [key: Method]: F | $ReadOnlyArray<F>,
  };

  declare export type Hooks<App, Doc> = {
    [key: HookType]: HookFunction<App, Doc>
      | $ReadOnlyArray<HookFunction<App, Doc>>
      | MethodHooks<App, Doc>,
  };

  declare export class Service<App, Document> {
    get(id: string, params: Params): Promise<Document>,
    find(params: Params): Promise<$ReadOnlyArray<Document>>,
    create(data: Document, params: Params): Promise<Document>,
    update(id: string, data: Document, params: Params): Promise<Document>,
    patch(id: string, data: Document, params: Params): Promise<Document>,
    remove(id: string, params: Params): Promise<{}>,

    hooks(hooks: Hooks<App>): this,
    publish(publisher: (data: {}) => $ReadOnlyArray<Connection>): this,
    publish(eventname: string, publisher: (data: {}) => $ReadOnlyArray<Connection>): this,
    on(eventname: string, cb: (data: mixed) => void): this,
    emit(eventname: string, data?: mixed): this,
    removeListener(eventname: string, listeners: ?mixed): this,
  }

  declare export class App {
    use<Document>(path: string, service: Service<this, Document>): this,
    service<Document>(path: string): Service<this, Document>,
    hooks(hooks: Hooks<this>): this,
    configure(cb: (app: this) => void): this,
    listen(port: number): this,
    set(name: string, value: mixed): this,
    get(name: string): mixed,
    on(eventname: string, cb: (data: ?mixed) => void): this,
    emit(eventname: string, data: ?mixed): this,
    removeListener(eventname: string, listeners: ?mixed): this,
  }

  declare export default {
    (): App,
    SKIP: SKIP,
  };
}
