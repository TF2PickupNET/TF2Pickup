// @flow strict-local

import {
  type App,
  type Service,
} from '@feathersjs/feathers';
import { Socket } from 'net';
import { type FeathersError } from '@feathersjs/errors';

import { type User } from '../../packages/types/src/user';

declare module '@feathersjs/express' {
  declare export interface ExpressRequest {
    app: ExpressApp,
    baseUrl: string,
    body: {},
    cookies: { [cookie: string]: string },
    connection: Socket,
    fresh: boolean,
    hostname: string,
    ip: string,
    ips: $ReadOnlyArray<string>,
    method: string,
    originalUrl: string,
    params: { [param: string]: string },
    path: string,
    protocol: 'https' | 'http',
    headers: { [name: string]: string },
    query: { [name: string]: string },
    route: string,
    secure: boolean,
    signedCookies: { [signedCookie: string]: string },
    stale: boolean,
    subdomains: $ReadOnlyArray<string>,
    xhr: boolean,
    user: User,
    get(field: string): string | void,
    accepts(types: string): string | false,
    accepts(types: $ReadOnlyArray<string>): string | false,
    acceptsCharsets(...charsets: $ReadOnlyArray<string>): string | false,
    acceptsEncodings(...encoding: $ReadOnlyArray<string>): string | false,
    acceptsLanguages(...lang: $ReadOnlyArray<string>): string | false,
    header(field: string): string | void,
    is(type: string): boolean,
    param(name: string, defaultValue?: string): string | void,

  }

  declare type ExpressCookieOptions = {
    domain?: string,
    encode?: (value: string) => string,
    expires?: Date,
    httpOnly?: boolean,
    maxAge?: number,
    path?: string,
    secure?: boolean,
    signed?: boolean,
  };

  declare type ExpressRenderCallback = (err: Error | null, html?: string) => mixed;

  declare export interface ExpressResponse {
    headersSent: boolean,
    locals: { [name: string]: mixed },
    append(field: string, value?: string): ExpressResponse,
    attachment(filename?: string): ExpressResponse,
    cookie(name: string, value: string, options?: ExpressCookieOptions): ExpressResponse,
    clearCookie(name: string, options?: ExpressCookieOptions): ExpressResponse,
    download(
      path: string,
      filename?: string,
      callback?: (err?: ?Error) => void
    ): ExpressResponse,
    format(typesObject: { [type: string]: () => void }): ExpressResponse,
    json(body?: mixed): ExpressResponse,
    jsonp(body?: mixed): ExpressResponse,
    links(links: { [name: string]: string }): ExpressResponse,
    location(path: string): ExpressResponse,
    redirect(url: string): ExpressResponse,
    redirect(status: number, url: string): ExpressResponse,
    render(
      view: string,
      locals?: { [name: string]: mixed },
      callback?: ExpressRenderCallback
    ): ExpressResponse,
    send(body?: mixed): ExpressResponse,
    sendFile(
      path: string,
      options?: ExpressRenderCallback,
      callback?: (err?: ?Error) => mixed
    ): ExpressResponse,
    sendStatus(statusCode: number): ExpressResponse,
    header(field: string, value?: string): ExpressResponse,
    header(headers: { [name: string]: string }): ExpressResponse,
    set(field: string, value?: string | $ReadOnlyArray<string>): ExpressResponse,
    set(headers: { [name: string]: string }): ExpressResponse,
    status(statusCode: number): ExpressResponse,
    type(type: string): ExpressResponse,
    vary(field: string): ExpressResponse,
    req: ExpressRequest,
    get(field: string): string | void,

  }

  declare type ExpressNextFuntion = (err?: ?Error | 'route') => mixed;

  declare export type ExpressMiddleware = (
    req: ExpressRequest,
    res: ExpressResponse,
    next: ExpressNextFuntion
  ) => void
    | Promise<void>;

  declare class ExpressApp extends App {
    use(middleware: ExpressMiddleware): this,
    use(path: string, middleware: ExpressMiddleware): this,
    use<Doc>(path: string, service: Service<this, Doc>): this,
  }

  declare export type App = ExpressApp;

  declare export default {
    (app: App): ExpressApp,
    json(): ExpressMiddleware,
    urlencoded(options: {}): ExpressMiddleware,
    rest(): (app: ExpressApp) => void,
    notFound(options: { verbose: boolean }): ExpressMiddleware,
    errorHandler(options: {
      html: (
        error: FeathersError,
        req: ExpressRequest,
        res: ExpressResponse,
        next: ExpressNextFuntion,
      ) => void,
      logger: false | () => void,
    }): ExpressMiddleware,
  };
}
