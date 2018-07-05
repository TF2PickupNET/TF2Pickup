// @flow strict-local

declare module 'axios' {
  declare function transformRequest<D>(data: D, headers: { [key: string]: string }): D;
  declare function transformResponse<D>(data: D): D;

  declare interface ProxyConfig {
    host: string,
    port: number,
    auth?: {
      username: string,
      password: string,
    },
  }

  declare interface Cancel {
    constructor(message?: string): Cancel,
    message: string,
  }

  declare interface CancelTokenSource {
    token: CancelToken,
    cancel(message?: string): void,
  }

  declare class CancelToken {
    constructor(executor: (cancel: (message?: string) => void) => void): CancelToken,
    static source(): CancelTokenSource,
    promise: Promise<Cancel>,
    reason?: Cancel,
    throwIfRequested(): void,
  }

  declare type Response<D = {}> = {
    data: D,
    status: number,
    statusText: string,
    headers: { [key: string]: string },
    config: Config,
  };

  declare type BaseConfig = {
    auth?: {
      username: string,
      password: string,
    },
    baseURL?: string,
    cancelToken?: CancelToken,
    headers?: { [key: string]: string },
    httpAgent?: mixed,
    httpsAgent?: mixed,
    maxContentLength?: number,
    maxRedirects?: number,
    params?: { [key: string]: mixed },
    paramsSerializer?: (params: { [key: string]: string }) => string,
    proxy?: ProxyConfig | false,
    adapter?: <D>(config: Config) => Promise<Response<D>>,
    responseType?: 'arraybuffer'
      | 'blob'
      | 'document'
      | 'json'
      | 'text'
      | 'stream',
    timeout?: number,
    validateStatus?: (status: number) => boolean,
    withCredentials?: boolean,
    xsrfCookieName?: string,
    xsrfHeaderName?: string,
    onUploadProgress?: (progressEvent: Event) => void,
    onDownloadProgress?: (progressEvent: Event) => void,
  };

  declare type Config = BaseConfig & {
    data?: {},
    method?: string,
    url: string,
  };

  declare interface RequestInterceptor {
    use(
      successHandler: (config: Config) => Config,
      errorHandler: (error: AxiosError<null>) => AxiosError<null>,
    ): number,
    eject(id: number): void,
  }

  declare interface ResponseInterceptor {
    use<D>(
      successHandler: (data: Response<D>) => Response<D>,
      errorHandler: (error: AxiosError<D>) => AxiosError<D>,
    ): number,
    eject(id: number): void,
  }

  declare class Axios {
    request<D>(config: Config): Promise<Response<D>>,
    get<D>(url: string, config?: BaseConfig): Promise<Response<D>>,
    delete<D>(url: string, config?: BaseConfig): Promise<Response<D>>,
    head<D>(url: string, config?: BaseConfig): Promise<Response<D>>,
    post<D>(
      url: string,
      data?: {} | string,
      config?: BaseConfig
    ): Promise<Response<D>>,
    put<D>(
      url: string,
      data?: {} | string,
      config?: BaseConfig
    ): Promise<Response<D>>,
    patch<D>(
      url: string,
      data?: {} | string,
      config?: BaseConfig,
    ): Promise<Response<D>>,
    interceptors: {
      request: RequestInterceptor,
      response: ResponseInterceptor,
    },
  }

  declare export class AxiosError<D> extends Error {
    config: BaseConfig,
    request?: http$ClientRequest | XMLHttpRequest,
    response?: Response<D>,
    code?: string,
  }

  declare interface Export extends Axios {
    Axios: typeof Axios,
    Cancel: Class<Cancel>,
    CancelToken: Class<CancelToken>,
    isCancel(value: mixed): boolean,
    create(config?: BaseConfig): Axios,
    all: typeof Promise.all,
  }

  declare export default Export;
}
