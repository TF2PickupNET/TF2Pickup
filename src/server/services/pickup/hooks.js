import debug from 'debug';
import classnames from 'classnames';
import { iff, isProvider } from 'feathers-hooks-common';

import hasPermission from '../../../utils/has-permission';
import {
  pipe,
  pick,
  omit,
  assign,
  map,
  flatten,
  arrayToObject,
  mapObject,
} from '../../../utils/functions';

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

  if (!isActiveGame) {
    return Object.assign({}, hook, { result: omit('serverId', 'logSecret')(hook.result) });
  }

  const server = await hook.app.service('servers').get(hook.result.serverId);
  const isInPickup = false;
  const canSeeServer = isInPickup || hasPermission('pickup.see-server', hook.params.user);
  const validKeys = classnames('ip stvPort stvPassword', {
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
  const users = arrayToObject(user => user.id)(allUsers);

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
    create(props) {
      props.app.service('pickup').emit('redirect', {
        id: props.result.id,
        users: pipe(
          Object.values,
          map(Object.values),
          map(player => player.id),
        )(props.result.teams),
      });
    },

    patch: [
      async (hook) => {
        if (hook.result.status === 'game-finished') {
          await hook.app.service('voice-channel').delete({
            region: hook.result.region,
            name: hook.result.id,
          });

          await cleanupServer(hook.app, hook.result.id);
        }
      },
      iff(isProvider('external'), [
        populateServer,
        populateUsers,
      ]),
    ],

    get: iff(isProvider('external'), [
      populateServer,
      populateUsers,
    ]),
  },
};
