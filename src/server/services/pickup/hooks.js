import configureServer from './configure-server';
import createMumbleChannel from './create-mumble-channel';
import removeMumbleChannel from './remove-mumble-channel';

export default {
  after: {
    create(props) {
      createMumbleChannel(props);
      configureServer(props);

      return props;
    },

    patch(props) {
      if (props.result.status === 'game-finished' || props.result.status === 'server-configuration-error') {
        removeMumbleChannel(props);
      }

      return props;
    },
  },
};
