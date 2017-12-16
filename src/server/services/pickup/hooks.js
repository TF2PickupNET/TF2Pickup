import debug from 'debug';
import classnames from 'classnames';

import hasPermission from '../../../utils/has-permission';
import {
  pipe,
  pick,
  omit,
  assign,
  map,
} from '../../../utils/functions';
import populateUserData from '../populate-user-data';

import reserveServer from './reserve-server';
import cleanupServer from './cleanup-server';

const log = debug('TF2Pickup:pickup:hooks');

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

  if (!isActiveGame || !hook.result.serverId) {
    return {
      ...hook,
      result: omit('serverId', 'logSecret')(hook.result),
    };
  }

  const server = await hook.app.service('servers').get(hook.result.serverId);
  const isInPickup = false;
  const canSeeServer = isInPickup || hasPermission('pickup.see-server', hook.params.user);
  const validKeys = classnames('ip stvPort stvPassword', {
    port: isInPickup || canSeeServer,
    password: isInPickup || canSeeServer,
    rconPassword: canSeeServer,
  }).split(' ');

  return {
    ...hook,
    result: pipe(
      omit('serverId', 'logSecret'),
      assign({ server: pick(...validKeys)(server) }),
    )(hook.result),
  };
}

/**
 * Populate the user data for each team player.
 *
 * @param {Object} hook - The hooks data.
 * @returns {Object} - The transformed hook.
 */
async function populateUsers(hook) {
  const redTeam = await populateUserData(hook.app, hook.result.teams.red);
  const bluTeam = await populateUserData(hook.app, hook.result.teams.blu);

  return {
    ...hook,
    result: {
      ...hook.result,
      teams: {
        red: redTeam,
        blu: bluTeam,
      },
    },
  };
}

export default {
  before: {
    create: [
      // Calculate the id of the pickup
      async (hook) => {
        const lastPickup = await hook.app.service('pickup').find({
          query: {
            $limit: 1,
            $sort: { launchedOn: -1 },
          },
        });

        return {
          ...hook,
          data: {
            ...hook.data,
            id: lastPickup[0] ? lastPickup[0].id + 1 : 1,
          },
        };
      },

      // Create a mumble channel
      async (hook) => {
        await hook.app.service('voice-channel').create({
          region: hook.data.region,
          name: hook.data.id,
        });
      },

      // Get a server for the pickup
      async (hook) => {
        try {
          const server = await reserveServer(hook.app, hook.data.region);

          return {
            ...hook,
            data: {
              ...hook.data,
              serverId: server.id,
              logSecret: server.logSecret,
            },
          };
        } catch (error) {
          log('Error while getting server for pickup', hook.data.id, error);

          await hook.app.service('discord-message').create({
            channel: 'errors',
            message: `Error while reserving server for pickup ${hook.data.id}`,
          });

          return {
            ...hook,
            data: {
              ...hook.data,
              status: 'server-reservation-error',
            },
          };
        }
      },
    ],

    async patch(hook) {
      if (hook.data.$set.status === 'game-finished') {
        await hook.app.service('voice-channel').delete({
          region: hook.result.region,
          name: hook.result.id,
        });

        await cleanupServer(hook.app, hook.result.id);
      }

      return hook;
    },
  },
  after: {
    create(hook) {
      hook.app.service('pickup').emit('redirect', {
        id: hook.result.id,
        users: pipe(
          Object.values,
          map(Object.values),
          map(player => player.id),
        )(hook.result.teams),
      });
    },

    patch: [
      populateServer,
      populateUsers,
    ],

    get: [
      populateServer,
      populateUsers,
    ],
  },
};
