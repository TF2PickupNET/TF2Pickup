import hooks from 'feathers-hooks-common';
import auth from '@feathersjs/authentication';
import {
  BeforeHookContext,
  CreateBeforeHookContext,
  ErrorHookContext,
  RemoveBeforeHookContext,
} from '@feathersjs/feathers';
import debug from 'debug';

const log = debug('TF2Pickup:hooks');

export default {
  before: {
    all(hook: BeforeHookContext<object>) {
      if (hook.params.provider === 'external') {
        return auth.hooks.authenticate(['jwt'])(hook);
      }

      return hook;
    },

    update: hooks.disallow(),
    patch: hooks.disallow('external'),

    remove(hook: RemoveBeforeHookContext<object>) {
      if (hook.path === 'authentication') {
        return hook;
      }

      return hooks.disallow('external')(hook);
    },

    create(hook: CreateBeforeHookContext<object>) {
      if (hook.path === 'authentication') {
        return hook;
      }

      return hooks.disallow('external')(hook);
    },
  },

  error: {
    all(hook: ErrorHookContext<object>) {
      console.log(hook, hook.error.code);
      if (hook.error.code === 404) {
        return hook;
      }

      log(
        `Error in '${hook.path}' service method ${hook.method.toUpperCase()}`,
        { error: hook.error },
      );

      return hook;
    },
  },
};
