import classnames from 'classnames';

import hasPermission from '../../../utils/has-permission';
import {
  pipe,
  pick, omit, assign,
  map, flatten,
  arrayToObject, mapObject,
} from '../../../utils/functions';

import configureServer from './configure-server';

/**
 * Populate the result with the server data.
 *
 * @param {Object} hook - The hooks data.
 * @returns {Object} - The transformed hook.
 */
async function populateServer(hook) {
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

/**
 * Populate the user data for each team player.
 *
 * @param {Object} hook - The hooks data.
 * @returns {Object} - The transformed hook.
 */
async function populateUsers(hook) {
  const usersService = hook.app.service('users');
  const allUsers = await Promise.all(
    pipe(
      Object.values,
      map(Object.values),
      flatten,
      map(player => usersService.get(player.id)),
    )(hook.result.teams),
  );
  const users = arrayToObject('id')(allUsers);

  return {
    ...hook,
    result: {
      ...hook.result,
      teams: mapObject(
        mapObject(
          map((player) => {
            const user = users[player.id];

            return {
              ...player,
              name: user.name,
              avatar: user.services.steam.avatar.medium,
              roles: user.roles,
            };
          }),
        ),
      )(hook.result.teams),
    },
  };
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
      populateServer,
      populateUsers,
    ],

    get: [
      populateServer,
      populateUsers,
    ],
  },
};
