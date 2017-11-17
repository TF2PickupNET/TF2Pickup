/* eslint-disable promise/prefer-await-to-callbacks */

import sleep from 'sleep-promise';
import debug from 'debug';
import gamemodes from '@tf2-pickup/configs/gamemodes';

import {
  map,
  pipe,
  mapObject,
} from '../../../utils/functions';
import {
  getPlayer,
  removePlayersFromClasses,
} from '../../../utils/pickup';

const log = debug('TF2Pickup:pickup-queue:socket-methods');

const addPlayerToClass = (className, player) => classes => Object.assign({}, classes, {
  [className]: [
    ...classes[className],
    player,
  ],
});

const sortClasses = mapObject(
  players => players.sort((player1, player2) => player1.joinedOn - player2.joinedOn),
);

/**
 * Checks if players is blocked for join the pickup queue.
 *
 * @param {Object} app - The feathers app object.
 * @param {String} userId - Player's ID.
 * @returns {Boolean} - Is player blocked.
 */
async function isPlayerInPickup(app, userId) {
  const serverStatus = [
    'setting-up-server',
    'waiting-for-game-to-start',
    'game-is-live',
  ];
  const query = { status: { $in: serverStatus } };
  const pickups = await app.service('pickup').find({ query });
  const regex = new RegExp(userId);

  return pickups.some(pickup => regex.test(JSON.stringify(pickup.teams)));
}

/**
 * Setup the socket methods for the users.
 *
 * @param {Object} app - The feathers app object.
 * @param {Object} socket - The socket connection.
 */
export default function socketMethods(app, socket) {
  const pickupQueue = app.service('pickup-queue');

  socket.on('pickup-queue.join', async ({
    gamemode,
    className,
  }) => {
    if (socket.feathers.user) {
      const region = socket.feathers.user.settings.region;
      const userId = socket.feathers.user.id;
      const queue = await pickupQueue.get(`${region}-${gamemode}`);
      const playerData = getPlayer(userId)(queue.classes);

      if (await isPlayerInPickup(app, userId)) {
        log('User blocked for pickup', userId);

        app.io.emit('notifications.add', {
          forUsers: [ userId ],
          message: 'You are already in a pickup',
        });
      } else {
        log('Adding user to pickup', userId);

        await pickupQueue.patch(queue.id, {
          $set: {
            classes: pipe(
              removePlayersFromClasses([userId]),
              addPlayerToClass(className, {
                id: userId,
                map: playerData ? playerData.map : null,
                readyUp: queue.status === 'ready-up',
                joinedOn: playerData ? playerData.joinedOn : new Date(),
              }),
              sortClasses,
            )(queue.classes),
          },
        });
      }
    }
  });

  socket.on('pickup-queue.remove', async ({ gamemode }) => {
    if (socket.feathers.user) {
      const region = socket.feathers.user.settings.region;
      const userId = socket.feathers.user.id;
      const queue = await pickupQueue.get(`${region}-${gamemode}`);

      log('Removing user from pickup', userId);

      await pickupQueue.patch(
        queue.id,
        { $set: { classes: removePlayersFromClasses([userId])(queue.classes) } },
      );
    }
  });

  socket.on('pickup-queue.ready-up', async ({ gamemode }) => {
    if (socket.feathers.user) {
      const region = socket.feathers.user.settings.region;
      const userId = socket.feathers.user.id;
      const queue = await pickupQueue.get(`${region}-${gamemode}`);

      const setReady = map((player) => {
        if (player.id === userId) {
          return Object.assign({}, player, { ready: true });
        }

        return player;
      });

      log('Readying user up', userId);

      await pickupQueue.patch(
        queue.id,
        { $set: { classes: mapObject(setReady)(queue.classes) } },
      );
    }
  });

  socket.on('pickup-queue.pick-map', async ({
    map: mapName,
    gamemode,
  }) => {
    if (socket.feathers.user) {
      const region = socket.feathers.user.settings.region;
      const userId = socket.feathers.user.id;
      const queue = await pickupQueue.get(`${region}-${gamemode}`);

      const setMap = map((player) => {
        if (player.id === userId) {
          return Object.assign({}, player, { map: mapName });
        }

        return player;
      });

      log('Setting map for user', userId, mapName);

      await pickupQueue.patch(
        queue.id,
        { $set: { classes: mapObject(setMap)(queue.classes) } },
      );
    }
  });

  socket.on('disconnect', async () => {
    if (socket.feathers.user) {
      const userId = socket.feathers.user.id;

      await sleep(60 * 1000);

      const user = await app.service('users').get(userId);

      if (!user.online) {
        log('Removing user from pickup because of disconnect', userId);

        const pickups = await Promise.all(
          pipe(
            Object.keys,
            map(gamemode => pickupQueue.get(`${user.settings.region}-${gamemode}`)),
          )(gamemodes),
        );

        await Promise.all(
          map(pickup => pickupQueue.patch(
            pickup.id,
            { $set: { classes: removePlayersFromClasses([userId])(pickup.classes) } },
          ))(pickups),
        );
      }
    }
  });
}
