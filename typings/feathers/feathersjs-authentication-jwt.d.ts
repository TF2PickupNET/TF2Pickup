declare module '@feathersjs/authentication-jwt' {
  import { Request } from '@feathersjs/express';
  import { ServerApp } from '@feathersjs/feathers';
  import User from '@typings/User';

  interface Payload { id: string }

  type DoneFunction = (
    err: Error | null,
    user: User | null,
    payload?: Payload,
  ) => void;

  interface VerifierType {
    app: ServerApp,
    verfiy(req: Request, payload: Payload, done: DoneFunction): void,
  }

  class Verifier implements VerifierType {
    public app: ServerApp;

    public verfiy(req: Request, payload: Payload, done: DoneFunction): void;
  }

  interface Options { Verifier: new () => VerifierType }

  export {
    Verifier,
    DoneFunction,
    Payload,
  };

  export default function jwt(options: Options): (app: ServerApp) => void;
}
