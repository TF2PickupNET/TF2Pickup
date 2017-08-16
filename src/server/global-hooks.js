import hooks from 'feathers-hooks-common';

export default {
  before: {
    create(props) {
      return hooks.disallow('external')(props);
    },
    remove: hooks.disallow('external'),
    patch: hooks.disallow('external'),
    update: hooks.disallow(),
  },
};
