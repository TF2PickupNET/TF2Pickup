import config from 'config';

import servemeStrategy from './serveme-strategy';

const strategies = {
  eu() {
    return servemeStrategy(
      'http://serveme.tf',
      config.get('service.serveme.apikey-eu'),
    );
  },

  na() {
    return servemeStrategy(
      'http://na.serveme.tf',
      config.get('service.serveme.apikey-na'),
    );
  },

  // Create a strategy to get the server from ozfortress
  au: () => {},
};

/**
 * Reserve a server for a new pickup.
 * This will create a new server in the server database.
 * This will call the appropriate handler for the different regions.
 *
 * @param {Object} app - The feathers app object.
 * @param {String} region - The region to reservate the server for.
 * @returns {Object} - Returns an object with the server id and the logsecret.
 */
export default async function reserveServer(app, region) {
  const serverService = app.service('server');
  const {
    data,
    logSecret,
  } = await strategies[region](app);
  const server = await serverService.create({
    region,
    ...data,
  });

  return {
    id: server.id,
    logSecret,
  };
}
