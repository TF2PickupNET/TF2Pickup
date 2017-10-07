/* eslint-disable promise/prefer-await-to-callbacks */

import mapValues from 'lodash.mapvalues';
import sleep from 'sleep-promise';
import debug from 'debug';

import gamemodes from '@tf2-pickup/configs/gamemodes';

const log = debug('TF2Pickup:pickup-queue:socket-methods');

function queueWithoutPlayer(queue, playerId) {
  return Object.assign({}, queue, {
    classes: Object
      .keys(queue.classes)
      .reduce((classes, className) => Object.assign(
        {},
        classes,
        { [className]: queue.classes[className].filter(player => player.id !== playerId) },
      ), {}),
  });
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

      log('Adding user to pickup', userId);

      await pickupQueue.patch(queue.id, { $set: { classes: newQueue.classes } });
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

      log('Readying user uo', userId);

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
