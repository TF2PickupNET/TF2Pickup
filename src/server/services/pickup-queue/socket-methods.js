/* eslint-disable promise/prefer-await-to-callbacks */

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
        ready: false,
        map: null,
        preReady: null,
      });

      await pickupQueue.patch(queue.id, { $set: { classes: newQueue.classes } });
    }
  });

  socket.on('pickup-queue.remove', async ({ gamemode }) => {
    if (socket.feathers.user) {
      const region = socket.feathers.user.settings.region;
      const userId = socket.feathers.user.id;
      const queue = await pickupQueue.get(`${region}-${gamemode}`);

      const newQueue = queueWithoutPlayer(queue, userId);

      await pickupQueue.patch(queue.id, { $set: { classes: newQueue.classes } });
    }
  });
}
