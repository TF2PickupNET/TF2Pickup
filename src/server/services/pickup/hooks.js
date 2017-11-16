import classnames from 'classnames';

import hasPermission from '../../../utils/has-permission';
import {
  pipe,
  pick, omit, assign,
} from '../../../utils/functions';

import configureServer from './configure-server';

async function populatePickup(hook) {
  const isActiveGame = [
    'waiting-for-game-to-start',
    'game-is-live',
  ].includes(hook.result.status);
  const server = await hook.app.service('servers').get(hook.result.serverId);
  const isInPickup = false;
  const canSeeServer = isInPickup || hasPermission('pickup.see-server', hook.params.user);
  const validKeys = classnames({
    ip: isActiveGame,
    stvPort: isActiveGame,
    stvPassword: isActiveGame,
    port: isInPickup || canSeeServer,
    password: isInPickup || canSeeServer,
    rconPassword: canSeeServer,
  }).split(' ');

  return Object.assign({}, hook, {
    result: pipe(
      omit('serverId', 'logSecret'),
      assign({ server: pick(...validKeys)(server) }),
    )(hook.result),
  });
}

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

    patch: [
      async (hook) => {
        const serverStatus = ['game-finished', 'server-configuration-error'];

        if (serverStatus.includes(hook.result.status)) {
          const mumbleChannels = hook.app.service('mumble-channels');

          await mumbleChannels.delete({
            region: hook.result.region,
            name: hook.result.id,
          });
        }

        return hook;
      },
      populatePickup,
    ],

    get: populatePickup,
  },
};
