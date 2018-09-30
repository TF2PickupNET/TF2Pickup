// @flow strict-local

import { type FeathersError } from '@feathersjs/errors';

declare module 'debug' {
  declare export default function debug(module: string): <Data>(
    message: string,
    data?: {|
      userId?: string,
      error?: FeathersError,
      data?: Data,
    |},
  ) => void;
}
