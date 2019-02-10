import { ServerApp } from '@feathersjs/feathers';
import resetQueue from '@server/services/pickup-queues/utils/reset-queue';
import { PickupQueueStates } from '@config/pickup-queue-states';
import debug from 'debug';

import hasEnoughPlayers from '../utils/has-enough-players';

const log = debug('TF2Pickup:pickup-queues:hooks:handle-ready-up-timeout');

async function handleReadyUpTimeout(app: ServerApp, queueId: string) {
  const queues = app.service('pickup-queues');

  try {
    const queue = await queues.get(queueId);
    const hasEnough = await hasEnoughPlayers(
      app,
      queue,
      // Check if the enough players are ready
      players => players.filter(player => player.isReady).length,
    );

    if (hasEnough) {
      await queues.patch(queueId, {
        state: PickupQueueStates.CreatingPickup,
        readyUpEnd: null,
      });
    } else {
      await resetQueue(app, queueId);
    }
  } catch (error) {
    log('Error while handling end of ready up timeout', {
      error,
      data: { queueId },
    });

    await resetQueue(app, queueId);
  }
}

export default handleReadyUpTimeout;
