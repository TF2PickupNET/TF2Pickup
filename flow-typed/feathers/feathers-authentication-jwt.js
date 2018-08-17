// @flow strict-local

import { type App } from '@feathersjs/feathers';
import { type ExpressRequest } from '@feathersjs/express';

import { type User } from '../../src/types/user';

declare module '@feathersjs/authentication-jwt' {
  declare export type Payload = { id: string };

  declare export type DoneFunction = (
    err: Error | null,
    user: User | null,
    payload?: Payload,
  ) => void;

  declare export class Verifier {
    app: App,
    constructor(app: App, options: {}): this,
    verify(req: ExpressRequest, payload: Payload, done: DoneFunction): void | Promise<void>,
  }

  declare type Options = { Verifier: Class<Verifier> };

  declare export default function jwt(options: Options): (app: App) => void;
}
