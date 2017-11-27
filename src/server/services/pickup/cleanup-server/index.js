import config from 'config';

import servemeStrategy from './serveme-strategy';

const strategies = {
  eu(server) {
    return servemeStrategy(
      'http://serveme.tf',
      config.get('service.serveme.apikey-eu'),
      server.reservationId,
    );
  },

  na(server) {
    return servemeStrategy(
      'http://serveme.tf',
      config.get('service.serveme.apikey-eu'),
      server.reservationId,
    );
  },
};

/**
 * Clean up the server after a pickup has ended.
 *
 * @param {Object} app - The feathers app object.
 * @param {Number} pickupId - The id of the pickup.
 * @returns {Boolean} - Returns whether or not the clean up was successful.
 */
export default async function cleanupServer(app, pickupId) {
  const pickup = await app.service('pickup').get(pickupId);
  const server = await app.service('servers').get(pickup.serverId);

  return strategies[pickup.region](server);
}
