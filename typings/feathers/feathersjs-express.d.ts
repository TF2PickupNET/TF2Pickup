declare module '@feathersjs/express' {
  import { ServerApp } from '@feathersjs/feathers';
  import { Socket } from 'net';
  import { FeathersError } from '@feathersjs/errors';

  interface ExpressRequest {
    app: ServerApp,
    baseUrl: string,
    body: {},
    cookies: { [cookie: string]: string },
    connection: Socket,
    fresh: boolean,
    hostname: string,
    ip: string,
    ips: string[],
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
    subdomains: string[],
    xhr: boolean,
    user: import('../../src/typings/User').default,
    get(field: string): string | void,
    accepts(types: string | string[]): string | false,
    acceptsCharsets(...charsets: string[]): string | false,
    acceptsEncodings(...encoding: string[]): string | false,
    acceptsLanguages(...lang: string[]): string | false,
    header(field: string): string | void,
    is(type: string): boolean,
    param(name: string, defaultValue?: string): string | void,
  }

  interface ExpressCookieOptions {
    domain?: string,
    encode?(value: string): string,
    expires?: Date,
    httpOnly?: boolean,
    maxAge?: number,
    path?: string,
    secure?: boolean,
    signed?: boolean,
  }

  type ExpressRenderCallback = (err: Error | null, html?: string) => unknown;

  interface ExpressResponse {
    headersSent: boolean,
    locals: { [name: string]: unknown },
    append(field: string, value?: string): ExpressResponse,
    attachment(filename?: string): ExpressResponse,
    cookie(name: string, value: string, options?: ExpressCookieOptions): ExpressResponse,
    clearCookie(name: string, options?: ExpressCookieOptions): ExpressResponse,
    download(
      path: string,
      filename?: string,
      callback?: (err?: Error) => void
    ): ExpressResponse,
    format(typesObject: { [type: string]: () => void }): ExpressResponse,
    json(body?: unknown): ExpressResponse,
    jsonp(body?: unknown): ExpressResponse,
    links(links: { [name: string]: string }): ExpressResponse,
    location(path: string): ExpressResponse,
    redirect(url: string): ExpressResponse,
    redirect(status: number, url: string): ExpressResponse,
    render(
      view: string,
      locals?: { [name: string]: unknown },
      callback?: ExpressRenderCallback
    ): ExpressResponse,
    send(body?: unknown): ExpressResponse,
    sendFile(
      path: string,
      options?: ExpressRenderCallback,
      callback?: (err?: Error) => unknown
    ): ExpressResponse,
    sendStatus(statusCode: number): ExpressResponse,
    header(field: string, value?: string): ExpressResponse,
    header(headers: { [name: string]: string }): ExpressResponse,
    set(field: string, value?: string | string[]): ExpressResponse,
    set(headers: { [name: string]: string }): ExpressResponse,
    status(statusCode: number): ExpressResponse,
    type(type: string): ExpressResponse,
    vary(field: string): ExpressResponse,
    req: ExpressRequest,
    get(field: string): string | void,

  }

  type ExpressNextFunction = (err?: Error | 'route') => unknown;

  type ExpressMiddleware = (
    req: ExpressRequest,
    res: ExpressResponse,
    next: ExpressNextFunction,
  ) => void | Promise<void>;

  interface Express {
    (app: ServerApp): ServerApp,
    json(): ExpressMiddleware,
    urlencoded(options: {}): ExpressMiddleware,
    rest(): (app: ServerApp) => void,
    notFound(options: { verbose: boolean }): ExpressMiddleware,
    errorHandler(options: {
      html(
        error: FeathersError<number, string>,
        req: ExpressRequest,
        res: ExpressResponse,
        next: ExpressNextFunction,
      ): void,
      logger: boolean,
    }): ExpressMiddleware,
  }

  const express: Express;

  export {
    ExpressMiddleware,
    ExpressRequest,
    ExpressResponse,
  };

  export default express;
}
