import configureServer from './configure-server';
import createMumbleChannel from './create-mumble-channel';

export default {
  after: {
    create(props) {
      createMumbleChannel(props);
      configureServer(props);

      return props;
    },
  },
};
