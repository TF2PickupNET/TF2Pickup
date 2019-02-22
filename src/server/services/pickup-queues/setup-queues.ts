import { ServerApp } from '@feathersjs/feathers';
import gamemodes from '@config/gamemodes';
import { Keys } from '@utils/types';
import regions from '@config/regions';
import { PickupQueueStates } from '@config/pickup-queue-states';
import getRandomMaps from '@server/services/pickup-queues/utils/get-random-maps';

const gamemodeKeys = Object.keys(gamemodes) as Keys<typeof gamemodes>;
const regionKeys = Object.keys(regions) as Keys<typeof regions>;

async function setupQueue(
  app: ServerApp,
  region: keyof typeof regions,
  gamemode: keyof typeof gamemodes,
) {
  const pickupQueues = app.service('pickup-queues');
  const id = `${region}-${gamemode}`;

  try {
    await pickupQueues.get(id);

    await pickupQueues.patch(id, {
      state: PickupQueueStates.WaitingForPlayers,
      readyUpEnd: null,
    });
  } catch (error) {
    if (error.code === 404) {
      await pickupQueues.create({
        id,
        region,
        gamemode,
        state: PickupQueueStates.WaitingForPlayers,
        maps: getRandomMaps(id, null),
        readyUpEnd: null,
      });
    }
  }
}

export default function setupQueues(app: ServerApp) {
  regionKeys.forEach((region) => {
    gamemodeKeys.forEach((gamemode) => {
      setupQueue(app, region, gamemode);
    });
  });
}
