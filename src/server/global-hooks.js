import hooks from 'feathers-hooks-common';

export default {
  before: {
    find: hooks.disallow('external'),
    get(props) {
      if (props.path === 'users' || props.path === 'pickup-queue') {
        return props;
      }

      return hooks.disallow('external')(props);
    },
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
