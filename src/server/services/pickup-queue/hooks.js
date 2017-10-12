import flatten from 'lodash.flatten';
import mapValues from 'lodash.mapvalues';

import statuses from './statuses';

/**
 * Populate the pickup with the correct user data.
 *
 * @param {Object} props - The props from the hook.
 * @returns {Object} - Returns the new populated hook data.
 */
async function populatePickup(props) {
  const pickup = props.result;
  const usersService = props.app.service('users');
  const playerIds = flatten(Object.values(pickup.classes)).map(player => player.id);
  const allUsers = await Promise.all(playerIds.map(playerId => usersService.get(playerId)));
  const users = allUsers.reduce((current, user) => {
    return {
      ...current,
      [user.id]: user,
    };
  }, {});

  return {
    ...props,
    result: {
      ...pickup,
      classes: mapValues(
        pickup.classes,
        classPlayers => classPlayers.map((player) => {
          const user = users[player.id];

          return {
            ...player,
            name: user.name,
            avatar: user.services.steam.avatar.medium,
          };
        }),
      ),
    },
  };
}

export default {
  after: {
    get: populatePickup,
    patch: [
      (props) => {
        switch (props.result.status) {
          case 'waiting': {
            return statuses.waiting(props);
          }

          case 'ready-up': {
            return statuses.readyUp(props);
          }

          default: return props;
        }
      },
      populatePickup,
    ],
  },
};
