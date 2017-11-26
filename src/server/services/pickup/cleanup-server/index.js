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

export default async function cleanupServer(app, pickupId) {
  const pickup = await app.service('pickup').get(pickupId);
  const server = await app.service('servers').get(pickup.serverId);

  return strategies[pickup.region](server);
}
