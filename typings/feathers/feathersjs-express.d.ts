declare module '@feathersjs/express' {
  import { ServerApp } from '@feathersjs/feathers';
  import { FeathersError } from '@feathersjs/errors';
  import {
    Request as ExpressRequest,
    Response,
    NextFunction,
    json,
    urlencoded,
  } from 'express';
  import User from '@typings/User';

  type Request = ExpressRequest & {
    user?: User,
    app: ServerApp,
  };

  type RequestHandler = (req: Request, res: Response, next: NextFunction) => void;

  interface Express {
    (app: ServerApp): ServerApp,
    json: typeof json,
    urlencoded: typeof urlencoded,
    rest(): (app: ServerApp) => void,
    notFound(options: { verbose: boolean }): RequestHandler,
    errorHandler(options: {
      html(
        error: FeathersError<number, string>,
        req: Request,
        res: Response,
        next: NextFunction,
      ): void,
      logger: boolean,
    }): RequestHandler,
  }

  const express: Express;

  export {
    Request,
    Response,
    RequestHandler,
  };

  export default express;
}
