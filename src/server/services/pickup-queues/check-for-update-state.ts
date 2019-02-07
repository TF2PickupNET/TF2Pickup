import debug from 'debug';
import { ServerApp } from '@feathersjs/feathers';
import gamemodes from '@config/gamemodes';
import { PickupStates } from '@config/pickup-states';

import hasEnoughPlayersForNewPickup from './utils/has-enough-players-for-new-pickup';
import hasEnoughPlayersForReadyUp from './utils/has-enough-players-for-ready-up';
import PickupQueue from '@typings/PickupQueue';

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
        const hasEnough = await hasEnoughPlayersForReadyUp(app, queue.id);

        if (hasEnough) {
          await queues.patch(queue.id, {
            state: PickupStates.ReadyUp,
            readyUpEnd: Date.now() + readyUpTime,
          });
        }

        break;
      }
      // Check when we are in ready up mode if enough players have readied up
      case 'ready-up': {
        const hasEnough = await hasEnoughPlayersForNewPickup(app, queue.id);

        if (hasEnough) {
          await queues.patch(queue.id, {
            state: PickupStates.CreatingPickup,
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
