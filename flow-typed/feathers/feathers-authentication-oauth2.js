// @flow

import {
  type App,
  type ExpressMiddleware,
  type ExpressRequest,
} from '@feathersjs/express';
import Strategy from 'passport-oauth2';
import { type FeathersError } from '@feathersjs/errors';

declare module '@feathersjs/authentication-oauth2' {
  declare export default function oauth2(options: {
    Strategy: Strategy,
    name: string,
    clientID: string,
    clientSecret: string,
    passReqToCallback?: boolean,
    callbackURL?: string,
    scope?: $ReadOnlyArray<string>,
    handler?: ExpressMiddleware,
  }): (app: App) => void;

  declare export class Verifier {
    app: App,
    constructor(app: App, options: {}): this,
    verfiy(
      req: ExpressRequest,
      accessToken: string,
      refreshToken: string,
      profile: {},
      done: (error: FeathersError | null, user?: {}) => void,
    ): Promise<void> | void,
  }
}
