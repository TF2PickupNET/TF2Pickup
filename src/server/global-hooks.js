import hooks from 'feathers-hooks-common';
import auth from 'feathers-authentication';
import debug from 'debug';
import { pluck } from '../utils/functions';

const log = debug('TF2Pickup:global-hooks');

export default {
  before: {
    get(hook) {
      return hook.params.accessToken ? auth.hooks.authenticate(['jwt'])(hook) : hook;
    },

    find(hook) {
      return hook.params.accessToken ? auth.hooks.authenticate(['jwt'])(hook) : hook;
    },

    update: hooks.disallow(),
    patch: hooks.disallow('external'),

    remove(hook) {
      if (hook.path === 'authentication') {
        return hook;
      }

      return hooks.disallow()(hook);
    },

    create(hook) {
      if (hook.path === 'authentication') {
        return hook;
      }

      return hooks.disallow('external')(hook);
    },
  },

  error(hook) {
    if (hook.error.code === 404) {
      return hook;
    }

    const type = pluck('error.hook.type', '')(hook);

    log(
      `Error in '${hook.path}' service method ${type.toUpperCase()} ${hook.method.toUpperCase()}`,
      hook.error.stack,
    );

    return hook;
  },
};
