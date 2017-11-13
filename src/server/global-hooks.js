import hooks from 'feathers-hooks-common';

export default {
  before: {
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
