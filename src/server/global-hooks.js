import hooks from 'feathers-hooks-common';
import debug from 'debug';

const log = debug('TF2Pickup:global-hooks');

export default {
  before: {
    find: hooks.disallow('external'),
    get(props) {
      if (props.path === 'users') {
        log('Allowing GET requests for /users');

        return props;
      }

      return hooks.disallow('external')(props);
    },
    create(props) {
      if (props.path === 'authentication') {
        log('Allowing CREATE requests for /authentication');

        return props;
      }

      return hooks.disallow('external')(props);
    },
    remove: hooks.disallow('external'),
    patch: hooks.disallow('external'),
    update: hooks.disallow(),
  },
};
