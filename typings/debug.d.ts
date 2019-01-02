declare module 'debug' {
  import { FeathersError } from '@feathersjs/errors';

  export interface Data<Extra> {
    userId?: string,
    error?: FeathersError<number, string>,
    data?: Extra,
  }

  interface Debug {
    (module: string): <D>(
      message: string,
      data?: Data<D>,
    ) => void,

    enable(module: string): void,

    log<D>(
      message: string,
      data?: Data<D>,
    ): void,
  }

  const debug: Debug;

  export default debug;
}
