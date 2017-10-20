/* eslint-disable promise/prefer-await-to-callbacks */

import mapValues from 'lodash.mapvalues';
import sleep from 'sleep-promise';
import debug from 'debug';

import gamemodes from '@tf2-pickup/configs/gamemodes';

const log = debug('TF2Pickup:pickup-queue:socket-methods');

/**
 * Remove the player from the queue.
 *
 * @param {Object} queue - The queue object.
 * @param {String} playerId - The player to remove from the queue.
 * @returns {Object} - Returns the new queue.
 */
function queueWithoutPlayer(queue, playerId) {
  return Object.assign({}, queue, {
    classes: mapValues(
      queue.classes,
      classPlayers => classPlayers.filter(player => player.id !== playerId),
    ),
  });
}

/**
 * Checks if players is blocked for join.
 *
 * @param {Object} app - The feathers app object.
 * @param {String} userId - Player's ID.
 * @returns {Boolean} - Is player blocked.
 */
async function checkBlock(app, userId) {
  const serverStatus = [ 'waiting-for-game-to-start', 'waiting-for-game-to-start', 'game-is-live' ]
  const query = { status: { $in: serverStatus } };
  const pickups = await app.service('pickup').find({ query });

  let isPlaying = false;

  pickups.forEach((pickup) => {
    const teams = JSON.stringify(pickup.teams);
    const regex = new RegExp(userId);

    if (regex.test(teams)) {
      isPlaying = true;
    }
  });

  return isPlaying;
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

      const newQueue = queueWithoutPlayer(queue, userId);

      newQueue.classes[className].push({
        id: userId,
        ready: pickupQueue.status === 'ready-up',
        map: null,
        preReady: null,
      });

      if (await checkBlock(app, userId)) {
        log('User blocked for pickup', userId);

        app.io.emit('notifications.add', {
          forUsers: [ userId ],
          message: 'You are already in a pickup',
        });
      } else {
        log('Adding user to pickup', userId);

        await pickupQueue.patch(queue.id, { $set: { classes: newQueue.classes } });
      }
    }
  });

  socket.on('pickup-queue.remove', async ({ gamemode }) => {
    if (socket.feathers.user) {
      const region = socket.feathers.user.settings.region;
      const userId = socket.feathers.user.id;
      const queue = await pickupQueue.get(`${region}-${gamemode}`);

      const newQueue = queueWithoutPlayer(queue, userId);

      log('Removing user from pickup', userId);

      await pickupQueue.patch(queue.id, { $set: { classes: newQueue.classes } });
    }
  });

  socket.on('pickup-queue.ready-up', async ({ gamemode }) => {
    if (socket.feathers.user) {
      const region = socket.feathers.user.settings.region;
      const userId = socket.feathers.user.id;
      const queue = await pickupQueue.get(`${region}-${gamemode}`);

      const setReady = players => players.map((player) => {
        if (player.id === userId) {
          return Object.assign({}, player, { ready: true });
        }

        return player;
      });

      log('Readying user up', userId);

      await pickupQueue.patch(queue.id, { $set: { classes: mapValues(queue.classes, setReady) } });
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
          Object
            .keys(gamemodes)
            .map(gamemode => pickupQueue.get(`${user.settings.region}-${gamemode}`)),
        );

        await Promise.all(
          pickups.map((pickup) => {
            const newQueue = queueWithoutPlayer(pickup, userId);

            return pickupQueue.patch(pickup.id, { $set: { classes: newQueue.classes } });
          }),
        );
      }
    }
  });
}
