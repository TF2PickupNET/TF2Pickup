import { map } from '../../../utils/functions';
import populateUserData from '../populate-user-data';

import statuses from './statuses';

/**
 * Populate a pickup with the user data that is needed on the client.
 *
 * @param {Object} hook - The hook object.
 * @param {Object} pickup - The pickup to populate the classes for.
 * @returns {Object} - Returns the populated pickup.
 */
async function populatePickup(hook, pickup) {
  const classes = await populateUserData(hook.app, pickup);

  return {
    ...pickup,
    classes,
  };
}

export default {
  after: {
    async find(hook) {
      const pickups = await Promise.all(
        map(pickup => populatePickup(hook.app, pickup))(hook.result),
      );

      return {
        ...hook,
        result: pickups,
      };
    },

    async get(hook) {
      const populatedPickup = await populatePickup(hook.app, hook.result);

      return {
        ...hook,
        result: populatedPickup,
      };
    },

    patch: [
      (hook) => {
        switch (hook.result.status) {
          case 'waiting': {
            statuses.waiting(hook);
            break;
          }
          case 'ready-up': {
            statuses.readyUp(hook);
            break;
          }
          default: break;
        }

        return hook;
      },
      async (hook) => {
        const populatedPickup = await populatePickup(hook.app, hook.result);

        return {
          ...hook,
          result: populatedPickup,
        };
      },
    ],
  },
};
