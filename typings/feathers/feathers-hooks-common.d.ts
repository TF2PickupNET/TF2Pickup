declare module 'feathers-hooks-common' {
  import {
    HookResult,
    CommonHookContext,
  } from '@feathersjs/feathers';

  type Transports = 'socketio' | 'primus' | 'rest' | 'external' | 'server';

  interface Hooks {
    disallow(...transports: Transports[]): (context: CommonHookContext<any>) => HookResult<any>,
  }

  const hooks: Hooks;

  export default hooks;
}
