/* eslint-disable promise/prefer-await-to-callbacks */

import debug from 'debug';

import hasPermission from '../../../utils/has-permission';

import reserveServer from './reserve-server';

const log = debug('TF2Pickup:pickup:socket-methods');

/**
 * Setup the socket methods for the users.
 *
 * @param {Object} app - The feathers app object.
 * @param {Object} socket - The socket connection.
 */
export default function socketMethods(app, socket) {
  const pickupService = app.service('pickup');

  socket.on('pickup.end', async ({ pickupId }) => {
    if (hasPermission('pickup.end', socket.feathers.user)) {
      log('Ending pickup', pickupId);

      await pickupService.patch(pickupId, {
        $set: {
          status: 'game-finished',
          endedOn: new Date(),
        },
      });
    }
  });

  socket.on('pickup.reserve-server', async ({ pickupId }) => {
    if (hasPermission('pickup.reserve-server', socket.feathers.user)) {
      const pickup = await pickupService.get(pickupId);

      if (pickup.status !== 'server-reservation-error') {
        return;
      }

      log('Manually reserving server for pickup', pickupId);

      try {
        const server = await reserveServer(app, pickup.region);

        await pickupService.patch(pickupId, {
          $set: {
            serverId: server.id,
            logSecret: server.logSecret,
          },
        });
      } catch (error) {
        log('Error while getting server for pickup', pickupId, error);

        await pickupService.patch(pickupId, { $set: { status: 'server-reservation-error' } });
      }
    }
  });
}
