import debug from 'debug';
import { ServerApp } from '@feathersjs/feathers';
import gamemodes from '@config/gamemodes';
import { PickupQueueStates } from '@config/pickup-queue-states';
import PickupQueue from '@typings/PickupQueue';
import hasEnoughPlayers from '@server/services/pickup-queues/utils/has-enough-players';

const log = debug('TF2Pickup:pickup-queues:check-for-update-state');

async function checkForUpdateState(
  app: ServerApp,
  queue: PickupQueue,
) {
  try {
    const queues = app.service('pickup-queues');

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
            state: PickupQueueStates.ReadyUp,
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
            state: PickupQueueStates.CreatingPickup,
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
