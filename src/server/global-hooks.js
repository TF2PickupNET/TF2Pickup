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

    create(props) {
      if (props.path === 'authentication') {
        return props;
      }

      return hooks.disallow('external')(props);
    },
    remove: hooks.disallow('external'),
    patch: hooks.disallow('external'),
    update: hooks.disallow(),
  },
};
