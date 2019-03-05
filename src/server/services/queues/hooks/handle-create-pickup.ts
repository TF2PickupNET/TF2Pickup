import getPlayersForPickup from '@server/services/queues/utils/get-players-for-pickup';
import { getMinPlayersForGamemode } from '@config/gamemodes';
import sleep from 'sleep-promise';
import { ServerApp } from '@feathersjs/feathers';
import resetQueue from '@server/services/queues/utils/reset-queue';
import { GeneralError } from '@feathersjs/errors';
import { QueueStates } from '@config/queue-states';
import debug from 'debug';
import getRandomMaps from '@server/services/queues/utils/get-random-maps';
import createNewPickup from '@server/services/pickups/utils/create-new-pickup';

const log = debug('TF2Pickup:pickup-queues:create-new-pickup');

async function handleCreatePickup(app: ServerApp, queueId: string) {
  const queues = app.service('queues');
  const users = app.service('users');

  try {
    const queue = await queues.get(queueId);
    const players = await getPlayersForPickup(app, queue);

    if (players.length !== getMinPlayersForGamemode(queue.gamemode)) {
      await sleep(1000);

      // Throw an error, so we can catch it and reset the queue
      throw new GeneralError();
    }

    const pickup = await createNewPickup(app, queue.region, queue.gamemode, queue.maps[0]);

    if (pickup === null) {
      throw new GeneralError();
    }

    await Promise.all(
      players.map(player => app.service('players').patch(player.id, {
        queueId: null,
        pickupId: pickup.id,
      })),
    );

    await queues.patch(queueId, {
      state: QueueStates.WaitingForPlayers,
      maps: getRandomMaps(queueId, pickup.map),
    });

    await Promise.all(
      players.map(player => users.patch(player.userId, { lastPickup: pickup.id }))
    );

    const otherPlayers = await app.service('players').find({
      query: {
        queueId,
        pickupId: null,
      },
    });

    // Reset the other players and their map picks if the maps have changed
    await Promise.all(
      otherPlayers.map((player) => {
        if (player.map === pickup.map) {
          return app.service('players').patch(player.id, { map: null });
        }

        return player;
      })
    );
  } catch (error) {
    log('Error while creating new pickup -> resetting queue', {
      error,
      data: { queueId },
    });

    // Reset the queue to a normal state when we get an error here
    await resetQueue(app, queueId);
  }
}

export default handleCreatePickup;
