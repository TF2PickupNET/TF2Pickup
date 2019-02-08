declare module 'debug' {
  import { FeathersError } from '@feathersjs/errors';

  export interface Data<ExtraData> {
    error?: FeathersError<number, string>,
    userId?: string,
    data?: ExtraData,
  }

  interface Debug {
    (module: string): <ExtraData>(
      message: string,
      data?: Data<ExtraData>,
    ) => void,

    enable(module: string): void,

    log<ExtraData>(
      message: string,
      data?: Data<ExtraData>,
    ): void,
  }

  const debug: Debug;

  export default debug;
}
