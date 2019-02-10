import { ServerApp } from '@feathersjs/feathers';
import resetPlayers from '@server/services/pickup-queues/utils/reset-players';
import { PickupQueueStates } from '@config/pickup-queue-states';

async function resetQueue(app: ServerApp, queueId: string) {
  const queues = app.service('pickup-queues');

  await Promise.all([
    resetPlayers(app, queueId),
    queues.patch(queueId, {
      state: PickupQueueStates.WaitingForPlayers,
      readyUpEnd: null,
    }),
  ]);
}

export default resetQueue;
