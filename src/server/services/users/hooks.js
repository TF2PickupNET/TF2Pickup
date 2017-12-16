import SteamCommunity from 'steamcommunity';
import debug from 'debug';
import config from 'config';
import errors from 'feathers-errors';
import hooks from 'feathers-hooks-common';

import { omit } from '../../../utils/functions';

import getUserData from './third-party-services';
import getTF2Hours from './third-party-services/steam/get-tf2-hours';
import getGroupMembers from './third-party-services/steam/get-group-members';

const community = new SteamCommunity();
const log = debug('TF2Pickup:users:hooks');

/**
 * Remove the sensible data from the users object.
 *
 * @param {Object} hook - The hook object.
 * @returns {Object} - Returns the new hook object.
 */
function removeSensibleData(hook) {
  if (hook.id === hook.params.user.id) {
    return {
      ...hook,
      result: omit(
        'elos',
        'lastUpdate',
      )(hook.result),
    };
  }

  return {
    ...hook,
    result: omit(
      'elos',
      'settings',
      'hasAcceptedTheRules',
      'lastUpdate',
      'friends',
      'boughtAnnouncers',
    )(hook.result),
  };
}

export default {
  before: {
    find: hooks.disallow('external'),

    create: [
      // Check if the user has enough hours
      async (hook) => {
        const tf2Hours = await getTF2Hours(hook.data.id, hook.app);

        if (tf2Hours === null) {
          log('Unable to fetch tf2 hours', hook.data.id);

          throw new errors.Timeout([
            'Something went wrong while trying to get your played hours in TF2!',
            'Please try again. If the problem persists concat a developer over discord.',
          ].join(' '));
        }

        if (tf2Hours < config.get('auth.required_hours')) {
          throw new errors.Forbidden([
            'You don\'t have the required minimum hours in TF2 to play TF2Pickup',
            `You will atleast need ${config.get('auth.required_hours')} in TF2.`,
          ].join(' '));
        }
      },
      // Check if the user is in the beta group
      async (hook) => {
        if (config.get('beta') && hook.app.get('env') !== 'dev') {
          const groupMembers = await getGroupMembers(
            config.get('auth.steam-group'),
            hook.app,
          );

          if (!groupMembers.includes(hook.data.id)) {
            log('User is not in the steam group', hook.data.id);

            throw new errors.Forbidden(
              'The site is currently in beta mode and you are not in the required Steam Group',
            );
          }
        }
      },
      async (hook) => {
        const userData = await getUserData(hook.data.id, true, hook.app);

        return {
          ...hook,
          data: {
            ...hook.data,
            ...userData,
            createdAt: new Date(),
          },
        };
      },
    ],
  },

  after: {
    create(hook) {
      log('Created a new user', hook.data.id);

      return new Promise((resolve) => {
        community.inviteUserToGroup(hook.data.id, '103582791435021680', () => {
          resolve();
        });
      });
    },

    get: hooks.iff(hooks.isProvider('external'), removeSensibleData),
    patch: hooks.iff(hooks.isProvider('external'), removeSensibleData),
  },
};
