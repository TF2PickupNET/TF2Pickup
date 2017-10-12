import servemeStrategy from './serveme-strategy';
import config from 'config';

const strategies = {
  eu(props) {
    return servemeStrategy(
      'http://serveme.tf',
      config.get("service.serveme.apikey-eu"),
    );
  },

  na(props) {
    return servemeStrategy(
      'http://na.serveme.tf',
      config.get("service.serveme.apikey-na"),
    );
  },

  // TODO: Create a strategy to get the server from ozfortress
  au: () => {},
};

/**
 * Reserve a server for a new pickup.
 * This will create a new server in the servers database.
 * This will call the appropriate handler for the different regions.
 *
 * @param {Object} props - The props from the hook.
 * @returns {Object} - Returns an object with the server id and the logsecret.
 */
export default async function reserveServer(props) {
  const { region } = props.result;
  const serverService = props.app.service('servers');
  const {
    data,
    logSecret,
  } = await strategies[region](props);
  const lastServer = serverService.find({
    limit: 1,
    sort: { id: -1 },
  });
  const server = await serverService.create({
    id: lastServer[0] ? lastServer[0].id : 1,
    region,
    ...data,
  });

  return {
    id: server.id,
    logSecret,
  };
}
