import {
  pipe,
  map,
  mapObject, arrayToObject,
} from '../../../utils/functions';
import { getPlayers } from '../../../utils/pickup';

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
  const allUsers = await Promise.all(
    pipe(
      getPlayers,
      map(player => usersService.get(player.id)),
    )(pickup.classes),
  );
  const users = arrayToObject('id')(allUsers);

  return {
    ...props,
    result: {
      ...pickup,
      classes: mapObject(
        map((player) => {
          const user = users[player.id];

          return {
            ...player,
            name: user.name,
            avatar: user.services.steam.avatar.medium,
            roles: user.roles,
          };
        }),
      )(pickup.classes),
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
