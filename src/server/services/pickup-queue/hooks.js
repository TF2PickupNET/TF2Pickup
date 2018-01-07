import hooks from 'feathers-hooks-common';

import {
  populateResult,
  populateUserData,
} from '../hooks';

import statuses from './statuses';

/**
 * Populate a pickup with the user data that is needed on the client.
 *
 * @param {Object} pickup - The pickup to populate the classes for.
 * @param {Object} hook - The hook object.
 * @returns {Object} - Returns the populated pickup.
 */
async function populatePickup(pickup, hook) {
  const classes = await populateUserData(pickup.classes, hook);

  return {
    ...pickup,
    classes,
  };
}

export default {
  before: {
    all(hook) {
      if (hook.method === 'get' || hook.method === 'find') {
        return hook;
      }

      return hooks.disallow('external')(hook);
    },
  },

  after: {
    get: hooks.iff(hooks.isProvider('external'), populateResult(populatePickup)),
    find: hooks.iff(hooks.isProvider('external'), populateResult(populatePickup)),

    patch: [
      (hook) => {
        if (statuses[hook.result.status]) {
          statuses[hook.result.status](hook);
        }

        return hook;
      },
      populateResult(populatePickup),
    ],
  },
};
