import debug from 'debug';
import gamemodes from '@tf2-pickup/configs/gamemodes';
import hooks from 'feathers-hooks-common';

import {
  map,
  omit,
  pipe,
} from '../../../utils/functions';
import {
  incrementIdHook,
  populateResult,
  populateUserData,
} from '../hooks';
import { getPlayers } from '../../../utils/pickup';
import { removePlayersFromClasses } from '../../../utils/pickup-queue';

import reserveServer from './reserve-server';

const log = debug('TF2Pickup:pickup:hooks');

/**
 * Populate the user data for each team player.
 *
 * @param {Object} pickup - The pickup to populate.
 * @param {Object} hook - The hooks data.
 * @returns {Object} - The transformed hook.
 */
export async function populateTeams(pickup, hook) {
  const redTeam = await populateUserData(pickup.teams.red, hook);
  const bluTeam = await populateUserData(pickup.teams.blu, hook);

  return {
    ...pickup,
    teams: {
      red: redTeam,
      blu: bluTeam,
    },
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

    create: [
      incrementIdHook,

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
  },

  after: {
    all(hook) {
      if ((hook.method === 'get' || hook.method === 'find') && !hook.params.provider) {
        return hook;
      }

      return populateResult(omit('logSecret'))(hook);
    },

    create: [
      async (hook) => {
        const users = hook.app.service('users');

        await Promise.all(
          pipe(
            getPlayers,
            map(user => users.patch(user.id, { $set: { lastPickupId: hook.result.id } })),
          )(hook.result),
        );
      },

      async (hook) => {
        await hook.app.service('voice-channel').create({
          region: hook.result.region,
          name: `Pickup ${hook.result.id}`,
        });
      },

      async (hook) => {
        const pickupQueue = hook.app.service('pickup-queue');
        const players = pipe(
          getPlayers,
          map(user => user.id),
        )(hook.result);

        await Promise.all(
          pipe(
            Object.keys,
            map(async (gamemode) => {
              const queue = await pickupQueue.get(`${hook.result.region}-${gamemode}`);

              return pickupQueue.patch(
                queue.id,
                { $set: { classes: removePlayersFromClasses(players)(queue.classes) } },
              );
            }),
          )(gamemodes),
        );
      },

      (hook) => {
        hook.service.emit('redirect', {
          id: hook.result.id,
          users: pipe(
            getPlayers,
            map(user => user.id),
          )(hook.result),
        });
      },
    ],

    patch: populateResult(populateTeams),

    get: hooks.iff(hooks.isProvider('external'), populateResult(populateTeams)),

    find: hooks.iff(hooks.isProvider('external'), populateResult(populateTeams)),
  },
};
