import { ServerApp } from '@feathersjs/feathers';

async function getPlayer(app: ServerApp, queueId: string, userId: string) {
  const [player = null] = await app.service('pickup-players').find({
    query: {
      pickupId: null,
      queueId,
      userId,
      $limit: 1,
    },
  });

  return player;
}

export default getPlayer;
