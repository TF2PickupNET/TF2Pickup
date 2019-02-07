import { Hooks } from '@feathersjs/feathers';
import PickupQueue from '@typings/PickupQueue';
import { PickupStates } from '@config/pickup-states';
import gamemodes from '@config/gamemodes';

import resetPlayers from './utils/reset-players';

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
      const queues = hook.app.service('pickup-queues');

      switch (state) {
        // We just entered ready-up state
        case PickupStates.ReadyUp: {
          if (!readyUpTimeouts.has(id)) {
            const timeoutId = setTimeout(async () => {
              readyUpTimeouts.delete(id);

              await Promise.all([
                resetPlayers(hook.app, id),
                queues.patch(id, {
                  state: PickupStates.WaitingForPlayers,
                  readyUpEnd: null,
                }),
              ]);
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
    },
  },
};

export default hooks;
