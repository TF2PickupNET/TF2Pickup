import config from 'config';
import debug from 'debug';

import servemeStrategy from './serveme-strategy';

const log = debug('TF2Pickup:pickup:cleanup-server');

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
 * @param {Object} pickup - The pickup object.
 * @returns {Boolean} - Returns whether or not the clean up was successful.
 */
export default async function cleanupServer(app, pickup) {
  const server = await app.service('servers').get(pickup.serverId);

  log('Cleaning server up for pickup', pickup.id);

  return strategies[pickup.region](server);
}
