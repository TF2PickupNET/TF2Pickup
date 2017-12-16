import hooks from 'feathers-hooks-common';

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
function populateClasses(hook, pickup) {
  return populateUserData(hook.app, pickup.classes);
}

export default {
  after: {
    find: hooks.iff(hooks.isProvider('external'), [
      async (hook) => {
        const pickups = await Promise.all(
          map(async (pickup) => {
            const classes = await populateClasses(hook, pickup);

            return Object.assign({}, pickup, { classes });
          })(hook.result),
        );

        return {
          ...hook,
          result: pickups,
        };
      },
    ]),

    get: hooks.iff(hooks.isProvider('external'), [
      async (hook) => {
        const classes = await populateClasses(hook, hook.result);

        return {
          ...hook,
          result: Object.assign({}, hook.result, { classes }),
        };
      },
    ]),

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
        const classes = await populateClasses(hook, hook.result);

        return {
          ...hook,
          result: Object.assign({}, hook.result, { classes }),
        };
      },
    ],
  },
};
