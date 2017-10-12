import servemeStrategy from './serveme-strategy';

const strategies = {
  eu(props) {
    return servemeStrategy(
      'http://serveme.tf',
      props.app.get('config').SERVEME_API_KEY_EU,
    );
  },

  na(props) {
    return servemeStrategy(
      'http://na.serveme.tf',
      props.app.get('config').SERVEME_API_KEY_NA,
    );
  },

  // TODO: Create a strategy to get the server from ozfortress
  au() {

  },
};

export default async function reserveServer(props) {
  const { region } = props.result;
  const serverService = props.app.service('servers');
  const {
    data,
    logSecret,
  } = await strategies[region](props);
  console.log(serverService);
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
