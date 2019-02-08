import { Hooks } from '@feathersjs/feathers';
import PickupQueue from '@typings/PickupQueue';
import { PickupStates } from '@config/pickup-states';
import gamemodes from '@config/gamemodes';

import handleReadyUpTimeout from '@server/services/pickup-queues/hooks/handle-ready-up-timeout';
import handleCreatePickup from '@server/services/pickup-queues/hooks/handle-create-pickup';
import checkForUpdateState from '@server/services/pickup-queues/check-for-update-state';

const readyUpTimeouts = new Map();

const hooks: Hooks<PickupQueue> = {
  after: {
    patch(hook) {
      const {
        state,
        id,
        gamemode,
      } = hook.result;
      const { readyUpTime } = gamemodes[gamemode];

      switch (state) {
        // If we just went into waiting for players state,
        // Check if we can start another ready up phase
        case PickupStates.WaitingForPlayers: {
          checkForUpdateState(hook.app, hook.result);
          break;
        }
        // We just entered ready-up state
        case PickupStates.ReadyUp: {
          if (!readyUpTimeouts.has(id)) {
            // Create a new timeout to reset the queue after the ready up time
            const timeoutId = setTimeout(() => {
              readyUpTimeouts.delete(id);

              handleReadyUpTimeout(hook.app, id);
            }, readyUpTime);

            readyUpTimeouts.set(id, timeoutId);
          }

          break;
        }
        // We have enough players for reserving a server
        case PickupStates.CreatingPickup: {
          // Clear the timeout and remove the TimerID from the map
          clearTimeout(readyUpTimeouts.get(id));
          readyUpTimeouts.delete(id);

          // Create a new pickup
          handleCreatePickup(hook.app, id);

          break;
        }
        case PickupStates.ReservingServer: {
          break;
        }
        case PickupStates.ConfiguringServer: {
          break;
        }
        default: break;
      }

      return hook;
    },
  },
};

export default hooks;
