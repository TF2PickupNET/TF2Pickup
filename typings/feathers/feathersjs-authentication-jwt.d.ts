declare module '@feathersjs/authentication-jwt' {
  import { ExpressRequest } from '@feathersjs/express';
  import { ServerApp } from '@feathersjs/feathers';

  interface Payload { id: string }

  type DoneFunction = (
    err: Error | null,
    user: import('../../src/typings/User').default | null,
    payload?: Payload,
  ) => void;

  interface VerifierType {
    app: ServerApp,
    verfiy(req: ExpressRequest, payload: Payload, done: DoneFunction): void,
  }

  class Verifier implements VerifierType {
    public app: ServerApp;

    public verfiy(req: ExpressRequest, payload: Payload, done: DoneFunction): void;
  }

  interface Options { Verifier: new () => VerifierType }

  export {
    Verifier,
    DoneFunction,
    Payload,
  };

  export default function jwt(options: Options): (app: ServerApp) => void;
}
