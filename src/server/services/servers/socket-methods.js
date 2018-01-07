/* eslint-disable promise/prefer-await-to-callbacks */

import debug from 'debug';

import hasPermission from '../../../utils/has-permission';

import configureServer from './configure-server';

const log = debug('TF2Pickup:servers:socket-methods');

/**
 * Setup the socket methods for the users.
 *
 * @param {Object} app - The feathers app object.
 * @param {Object} socket - The socket connection.
 */
export default function socketMethods(app, socket) {
  socket.on('servers.configure', async ({ pickupId }) => {
    if (hasPermission('servers.configure', socket.feathers.user)) {
      const pickup = await app.service('pickup').get(pickupId);

      if (!pickup.serverId) {
        return;
      }

      if (pickup.status === 'setting-up-server' || pickup.status === 'game-finished') {
        return;
      }

      try {
        await configureServer(app, pickup.serverId);
      } catch (error) {
        log('Error while manually configuring server for pickup', pickupId, error);
      }
    }
  });
}
