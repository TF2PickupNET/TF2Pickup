import hasPermission from '../../../utils/has-permission';
import {
  omit,
  pipe,
  assign,
} from '../../../utils/functions';

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

    async get(props) {
      const isInPickup = true;
      const canSeeServer = isInPickup || hasPermission('pickup.see-server', props.user);
      const server = await props.app.service('servers').get(props.result.serverId);

      console.log(server);

      return Object.assign({}, props, {
        result: pipe(
          omit('serverId', 'logSecret'),
          assign({ server }),
        )(props.result),
      });
    },
  },
};
