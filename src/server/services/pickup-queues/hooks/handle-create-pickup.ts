import getPlayersForPickup from '@server/services/pickup-queues/utils/get-players-for-pickup';
import { getMinPlayersForGamemode } from '@config/gamemodes';
import sleep from 'sleep-promise';
import { ServerApp } from '@feathersjs/feathers';
import resetQueue from '@server/services/pickup-queues/utils/reset-queue';
import { GeneralError } from '@feathersjs/errors';

async function handleCreatePickup(app: ServerApp, queueId: string) {
  const queues = app.service('pickup-queues');
  const pickupPlayers = app.service('pickup-players');

  try {
    const queue = await queues.get(queueId);
    const players = await getPlayersForPickup(app, queue);

    if (players.length !== getMinPlayersForGamemode(queue.gamemode)) {
      await sleep(1000);

      // Throw an error, so we can catch it and reset the queue
      throw new GeneralError();
    }

    // TODO: Add pickup creation
    const pickup = { id: 1 };

    await Promise.all(
      players.map(player => pickupPlayers.patch(player.id, {
        queueId: null,
        pickupId: pickup.id,
      })),
    );
  } catch (error) {
    // TODO: Add logging
    // Reset the queue to a normal state when we get an error here
    await resetQueue(app, queueId);
  }
}

export default handleCreatePickup;
