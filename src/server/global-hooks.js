import hooks from 'feathers-hooks-common';

export default {
  before: {
    find(props) {
      if (props.path === 'pickup-queue') {
        return props;
      }

      return hooks.disallow('external')(props);
    },
    get(props) {
      if (props.path === 'users') {
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
