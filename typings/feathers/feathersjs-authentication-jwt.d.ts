declare module '@feathersjs/authentication-jwt' {
  import { ExpressRequest } from '@feathersjs/express';
  import { ServerApp } from '@feathersjs/feathers';

  export interface Payload { id: string }

  export type DoneFunction = (
    err: Error | null,
    user: import('../../src/types/User').default | null,
    payload?: Payload,
  ) => void;

  export interface VerifierType {
    app: ServerApp,
    verfiy(req: ExpressRequest, payload: Payload, done: DoneFunction): void,
  }

  export class Verifier implements VerifierType {
    public app: ServerApp;

    public verfiy(req: ExpressRequest, payload: Payload, done: DoneFunction): void;
  }

  interface Options { Verifier: new () => VerifierType }

  export default function jwt(options: Options): (app: ServerApp) => void;
}
