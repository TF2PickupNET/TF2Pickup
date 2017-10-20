import configureServer from './configure-server';

export default {
  after: {
    create(props) {
      configureServer(props);

      props.app.service('mumble').create(props.result.region, props.result.id);

      return props;
    },

    patch(props) {
      const serverStatus = [ 'game-finished', 'server-configuration-error' ];

      if (serverStatus.includes(props.result.status)) {
        props.app.service('mumble').create(props.result.region, props.result.mumbleChannel);
      }

      return props;
    },
  },
};
