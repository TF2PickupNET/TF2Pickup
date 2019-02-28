import {disallow} from 'feathers-hooks-common';
import auth from '@feathersjs/authentication';
import {
  BeforeHookContext,
  DefaultDocument,
  Hooks,
} from '@feathersjs/feathers';
import debug from 'debug';

const log = debug('TF2Pickup:hooks');

const disallowExternal = (hook: BeforeHookContext<DefaultDocument>) => {
  if (hook.path === 'authentication') {
    return hook;
  }

  return disallow('external')(hook);
};

function requireAuth(
  hook: BeforeHookContext<DefaultDocument>
) {
  if (hook.params.provider === 'external') {
    return auth.hooks.authenticate(['jwt'])(hook);
  }

  return hook;
}

const hooks: Hooks<DefaultDocument> = {
  before: {
    find: requireAuth,
    get: requireAuth,
    // Completely disallow the update hook
    update: disallow(),
    // Disallow every patch, remove, create call from external
    patch: disallowExternal,
    remove: disallowExternal,
    create: disallowExternal,
  },

  error: {
    all(hook) {
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

export default hooks;
