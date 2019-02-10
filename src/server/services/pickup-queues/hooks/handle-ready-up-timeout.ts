import { ServerApp } from '@feathersjs/feathers';
import resetQueue from '@server/services/pickup-queues/utils/reset-queue';
import { PickupQueueStates } from '@config/pickup-queue-states';

import hasEnoughPlayers from '../utils/has-enough-players';

async function handleReadyUpTimeout(app: ServerApp, id: string) {
  const queues = app.service('pickup-queues');

  try {
    const queue = await queues.get(id);
    const hasEnough = await hasEnoughPlayers(
      app,
      queue,
      // Check if the enough players are ready
      players => players.filter(player => player.isReady).length,
    );

    if (hasEnough) {
      await queues.patch(id, {
        state: PickupQueueStates.CreatingPickup,
        readyUpEnd: null,
      });
    } else {
      await resetQueue(app, id);
    }
  } catch (error) {
    // TODO: Add logging
  }
}

export default handleReadyUpTimeout;
