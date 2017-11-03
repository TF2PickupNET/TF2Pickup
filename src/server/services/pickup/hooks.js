import configureServer from './configure-server';

export default {
  after: {
    create(props) {
      configureServer(props);

      props.app.service('mumble-channels').create({
        region: props.result.region,
        name: props.result.id,
      });

      return props;
    },

    async patch(props) {
      const serverStatus = ['game-finished', 'server-configuration-error'];

      if (serverStatus.includes(props.result.status)) {
        const mumbleChannels = props.app.service('mumble-channels');

        await mumbleChannels.delete({
          region: props.result.region,
          name: props.result.id,
        });
      }

      return props;
    },
  },
};
