import { ServerApp } from '@feathersjs/feathers';
import resetPlayers from '@server/services/queues/utils/reset-players';
import { QueueStates } from '@config/queue-states';

async function resetQueue(app: ServerApp, queueId: string) {
  const queues = app.service('queues');

  await Promise.all([
    resetPlayers(app, queueId),
    queues.patch(queueId, {
      state: QueueStates.WaitingForPlayers,
      readyUpEnd: null,
    }),
  ]);
}

export default resetQueue;
