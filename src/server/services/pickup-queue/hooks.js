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
 * @param {Object} app - The feathers app object.
 * @param {Object} pickup - The pickup to populate.
 * @returns {Object} - Returns the new populated pickup.
 */
async function populatePickup(app, pickup) {
  const usersService = app.service('users');
  const allUsers = await Promise.all(
    pipe(
      getPlayers,
      map(player => usersService.get(player.id)),
    )(pickup.classes),
  );
  const users = arrayToObject(user => user.id)(allUsers);

  return {
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
  };
}

export default {
  after: {
    async find(props) {
      const pickups = await Promise.all(
        map(pickup => populatePickup(props.app, pickup))(props.result),
      );

      return {
        ...props,
        result: pickups,
      };
    },
    patch: [
      (props) => {
        switch (props.result.status) {
          case 'waiting': {
            statuses.waiting(props);
            break;
          }
          case 'ready-up': {
            statuses.readyUp(props);
            break;
          }
          default: break;
        }

        return props;
      },
      async (props) => {
        const populatedPickup = await populatePickup(props.app, props.result);

        return {
          ...props,
          result: populatedPickup,
        };
      },
    ],
  },
};
