import debug from 'debug';
import { ServerApp } from '@feathersjs/feathers';

const log = debug('TF2Pickup:pickup-players:reset-players');

async function resetPlayers(app: ServerApp, queueId: string) {
  try {
    const players = await app.service('players').find({
      query: {
        queueId,
        pickupId: null,
      },
    });

    await Promise.all(
      players.map(player => app.service('players').patch(
        player.id,
        { isReady: false },
      )),
    );
  } catch (error) {
    log('Error while resetting players', {
      error,
      data: { queueId },
    });
  }
}

export default resetPlayers;
