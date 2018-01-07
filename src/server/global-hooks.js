import hooks from 'feathers-hooks-common';
import auth from 'feathers-authentication';

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
};
