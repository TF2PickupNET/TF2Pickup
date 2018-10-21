// @flow

import hooks from 'feathers-hooks-common';
import auth from '@feathersjs/authentication';
import {
  type BeforeHookContext,
  type ErrorHookContext,
} from '@feathersjs/feathers';
import debug from 'debug';
import PrettyError from 'pretty-error';

import { isString } from '../utils';

const log = debug('TF2Pickup:hooks');
const pe = new PrettyError();

export default {
  before: {
    get(hook: BeforeHookContext<{}>) {
      return isString(hook.params.accessToken) ? auth.hooks.authenticate(['jwt'])(hook) : hook;
    },

    find(hook: BeforeHookContext<{}>) {
      return isString(hook.params.accessToken) ? auth.hooks.authenticate(['jwt'])(hook) : hook;
    },

    update: hooks.disallow(),
    patch: hooks.disallow('external'),

    remove(hook: BeforeHookContext<{}>) {
      if (hook.path === 'authentication') {
        return hook;
      }

      return hooks.disallow('external')(hook);
    },

    create(hook: BeforeHookContext<{}>) {
      if (hook.path === 'authentication') {
        return hook;
      }

      return hooks.disallow('external')(hook);
    },
  },

  error(hook: ErrorHookContext<{}>) {
    if (hook.error.code === 404) {
      return hook;
    }

    log(
      `Error in '${hook.path}' service method ${hook.method.toUpperCase()}`,
      { error: pe.render(hook.error) },
    );

    return hook;
  },
};
