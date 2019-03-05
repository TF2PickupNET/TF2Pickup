import debug from 'debug';
import { ServerApp } from '@feathersjs/feathers';
import gamemodes from '@config/gamemodes';
import { QueueStates } from '@config/queue-states';
import Queue from '@typings/Queue';
import hasEnoughPlayers from '@server/services/queues/utils/has-enough-players';

const log = debug('TF2Pickup:pickup-queues:check-for-update-state');

async function checkForUpdateState(
  app: ServerApp,
  queue: Queue,
) {
  try {
    const queues = app.service('queues');

    switch (queue.state) {
      // Check if we have enough players for each class for a ready up state
      case 'waiting-for-players': {
        const { readyUpTime } = gamemodes[queue.gamemode];
        const hasEnough = await hasEnoughPlayers(
          app,
          queue,
          players => players.length,
        );

        if (hasEnough) {
          await queues.patch(queue.id, {
            state: QueueStates.ReadyUp,
            readyUpEnd: Date.now() + readyUpTime,
          });
        }

        break;
      }
      // Check when we are in ready up mode if enough players have readied up
      case 'ready-up': {
        const hasEnough = await hasEnoughPlayers(
          app,
          queue,
          // Check if the first required players are ready
          (players, min) => players.filter((player, index) => player.isReady && index < min).length,
        );

        if (hasEnough) {
          await queues.patch(queue.id, {
            state: QueueStates.CreatingPickup,
            readyUpEnd: null,
          });
        }

        break;
      }
      default: break;
    }
  } catch (error) {
    log('Error while checking to update state of pickup-queue', {
      error,
      data: { queueId: queue.id },
    });
  }
}

export default checkForUpdateState;
