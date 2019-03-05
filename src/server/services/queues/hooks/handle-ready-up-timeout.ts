import { ServerApp } from '@feathersjs/feathers';
import resetQueue from '@server/services/queues/utils/reset-queue';
import { QueueStates } from '@config/queue-states';
import debug from 'debug';

import hasEnoughPlayers from '../utils/has-enough-players';

const log = debug('TF2Pickup:pickup-queues:hooks:handle-ready-up-timeout');

async function handleReadyUpTimeout(app: ServerApp, queueId: string) {
  const queues = app.service('queues');

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
        state: QueueStates.CreatingPickup,
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
