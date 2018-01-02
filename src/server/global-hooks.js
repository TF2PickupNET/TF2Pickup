import hooks from 'feathers-hooks-common';
import auth from 'feathers-authentication';

export default {
  before: {
    all: [
      (hook) => {
        if (hook.path === 'authentication' || !hook.params.accessToken) {
          return hook;
        }

        return auth.hooks.authenticate(['jwt'])(hook);
      },
    ],

    update: hooks.disallow(),
  },
};
