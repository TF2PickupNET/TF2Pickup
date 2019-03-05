import Queue from '@typings/Queue';
import { Forbidden } from '@feathersjs/errors';
import { QueueStates } from '@config/queue-states';
import gamemodes from '@config/gamemodes';
import { Keys } from '@utils/types';
import { ServerApp } from '@feathersjs/feathers';
import debug from 'debug';

const log = debug('TF2Pickup:pickup-queues:get-players-fpr-pickup');

async function getPlayersForPickup(app: ServerApp, queue: Queue) {
  if (queue.state !== QueueStates.CreatingPickup) {
    throw new Forbidden();
  }

  const { slots } = gamemodes[queue.gamemode];
  const classNames = Object.keys(slots) as Keys<typeof slots>;

  try {
    const players = await Promise.all(
      classNames.map(className => app.service('players').find({
        query: {
          pickupId: null,
          queueId: queue.id,
          class: className,
          isReady: true,
          $limit: slots[className],
          $sort: { joinedOn: 1 },
        },
      })),
    );

    return players.reduce((accu, classPlayers) => [
      ...accu,
      ...classPlayers,
    ], []);
  } catch (error) {
    log('Error while getting players for new pickup', {
      error,
      data: { queueId: queue.id },
    });

    return [];
  }
}

export default getPlayersForPickup;
