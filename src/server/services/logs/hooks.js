import hooks from 'feathers-hooks-common';

export default {
  before: { patch: hooks.disallow() },

  after: {
    create(props) {
      if (props.result.environment === 'server') {
        // eslint-disable-next-line no-console
        console.log(props.result.message);
      }
    },
  },
};
