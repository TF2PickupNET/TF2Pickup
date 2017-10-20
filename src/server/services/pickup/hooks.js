import configureServer from './configure-server';
import createMumbleLobby from './create-mumble-lobby';

export default {
  after: {
    create(props) {
      createMumbleLobby(props);
      configureServer(props);

      return props;
    },
  },
};
