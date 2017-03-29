import hooks from 'feathers-hooks-common';

export default {
  before: {
    create: hooks.disallow('external'),
    remove: hooks.disallow('external'),
    patch: hooks.disallow('external'),
    update: hooks.disallow(),
  },
};
