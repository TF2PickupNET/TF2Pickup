/* eslint-disable promise/prefer-await-to-callbacks */

import gamemodes from '@tf2-pickup/configs/gamemodes';

import {
  pipe,
  mapObject,
} from '../../../utils/functions';
import {
  addPlayerToClass,
  getPlayer,
  isPlayerInPickup,
  removePlayersFromClasses,
  sortClasses,
  updateUserItem,
} from '../../../utils/pickup-queue';
import hasPermission from '../../../utils/has-permission';

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

      if (await isPlayerInPickup(app, userId)) {
        app.service('notifications').create({
          forUsers: [ userId ],
          message: 'You are already in a pickup',
        });
      } else {
        const queue = await pickupQueue.get(`${region}-${gamemode}`);
        const playerData = getPlayer(userId)(queue);

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

      await pickupQueue.patch(
        queue.id,
        { $set: { classes: updateUserItem(userId, { ready: true })(queue.classes) } },
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

      await pickupQueue.patch(
        queue.id,
        { $set: { classes: updateUserItem(userId, { map: mapName })(queue.classes) } },
      );
    }
  });

  socket.on('pickup-queue.kick', async ({
    gamemode,
    userId,
  }) => {
    const user = await app.service('users').get(userId);

    if (hasPermission('pickup.kick', socket.feathers.user, user)) {
      const region = socket.feathers.user.settings.region;
      const queue = await pickupQueue.get(`${region}-${gamemode}`);

      await pickupQueue.patch(
        queue.id,
        { $set: { classes: removePlayersFromClasses([userId])(queue.classes) } },
      );

      app.service('notifications').create({
        forUsers: [userId],
        sound: 'alert',
        message: `You got kicked by ${socket.feathers.user.name}`,
      });
    }
  });

  if (app.get('env') === 'dev') {
    socket.on('pickup-queue.fill', async ({ gamemode }) => {
      const user = socket.feathers.user;
      const queue = await pickupQueue.get(`${user.settings.region}-${gamemode}`);
      const player = {
        id: user.id,
        readyUp: null,
        map: null,
        joinedOn: new Date(),
      };

      await pickupQueue.patch(queue.id, {
        $set: {
          classes: mapObject((players, className) => {
            const min = gamemodes[gamemode].slots[className];

            return []
              .concat(players)
              .concat(new Array(min - players.length).fill(player));
          })(queue.classes),
        },
      });
    });
  }
}
