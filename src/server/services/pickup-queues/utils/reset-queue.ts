import { ServerApp } from '@feathersjs/feathers';
import resetPlayers from '@server/services/pickup-queues/utils/reset-players';
import { PickupStates } from '@config/pickup-states';

async function resetQueue(app: ServerApp, queueId: string) {
  const queues = app.service('pickup-queues');

  await Promise.all([
    resetPlayers(app, queueId),
    queues.patch(queueId, {
      state: PickupStates.WaitingForPlayers,
      readyUpEnd: null,
    }),
  ]);
}

export default resetQueue;
