// @flow

import hooks from 'feathers-hooks-common';
import auth from '@feathersjs/authentication';
import {
  type BeforeHookContext,
  type App,
  type ErrorHookContext,
} from '@feathersjs/feathers';
import { isString } from '@tf2pickup/utils';
import debug from 'debug';

const log = debug('TF2Pickup:hooks');

export default {
  before: {
    get(hook: BeforeHookContext<App, {}>) {
      return isString(hook.params.accessToken) ? auth.hooks.authenticate(['jwt'])(hook) : hook;
    },

    find(hook: BeforeHookContext<App, {}>) {
      return isString(hook.params.accessToken) ? auth.hooks.authenticate(['jwt'])(hook) : hook;
    },

    update: hooks.disallow(),
    patch: hooks.disallow('external'),

    remove(hook: BeforeHookContext<App, {}>) {
      if (hook.path === 'authentication') {
        return hook;
      }

      return hooks.disallow('external')(hook);
    },

    create(hook: BeforeHookContext<App, {}>) {
      if (hook.path === 'authentication') {
        return hook;
      }

      return hooks.disallow('external')(hook);
    },
  },

  error(hook: ErrorHookContext<App, {}>) {
    if (hook.error.code === 404) {
      return hook;
    }

    log(
      `Error in '${hook.path}' service method ${hook.method.toUpperCase()}`,
      hook.error.message,
    );

    return hook;
  },
};
