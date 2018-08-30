// @flow strict-local

import { type FeathersError } from '@feathersjs/errors';

declare module 'debug' {
  declare function log(message: string, data: {
    userId: string | null,
    error: FeathersError,
  }): void;

  declare export default function debug(module: string): log;
}
