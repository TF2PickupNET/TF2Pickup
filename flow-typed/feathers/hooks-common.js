// @flow strict-local

import {
  type HookFunction,
  type App,
} from '@feathersjs/feathers';

declare module 'feathers-hooks-common' {
  declare export default {
    disallow(
      service?: 'socketio' | 'primus' | 'rest' | 'external' | 'server',
    ): HookFunction<App, {}>,
  }
}
