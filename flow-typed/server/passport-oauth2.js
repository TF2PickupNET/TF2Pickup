// @flow

declare module 'passport-oauth2' {
  declare export type Verify = (
    req: ExpressRequest,
    accessToken: string,
    refreshToken: string,
    profile: {},
    done: (error: Error | null, user?: {}) => void,
  ) => void;

  declare export default class OAuth2Strategy {
    _oauth2: {
      get(path: string, param: string): {},
      useAuthorizationHeaderforGET(boolean): void,
      setAuthMethod(type: string): void,
    },

    constructor(options: {}, verify: Verify): this,

  }
}
