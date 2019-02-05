import { ServerApp } from '@feathersjs/feathers';

import gamemodes from '@config/gamemodes';
import { Keys } from '@utils/types';
import regions from '@config/regions';

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
      state: 'waiting-for-players',
      readyUpEnd: null,
    });
  } catch (error) {
    if (error.code === 404) {
      await pickupQueues.create({
        id,
        state: 'waiting-for-players',
        maps: ['', '', ''],
        region,
        gamemode,
        readyUpEnd: null,
      });
    }
  }
}

export default function setupQueues() {
  return (app: ServerApp) => {
    regionKeys.forEach((region) => {
      gamemodeKeys.forEach((gamemode) => {
        setupQueue(app, region, gamemode);
      });
    });
  };
}
