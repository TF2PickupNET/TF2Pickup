import configureServer from './configure-server';

export default {
  after: {
    create(props) {
      configureServer(props);

      return props;
    },
  },
};
