// @flow strict-local

import { type FeathersError } from '@feathersjs/errors';

declare module 'debug' {
  declare export type Data<Extra> = {|
    userId?: string,
    error?: FeathersError,
    data?: Extra,
  |};

  declare export default function debug(module: string): <D>(
    message: string,
    data?: Data<D>,
  ) => void;
}
