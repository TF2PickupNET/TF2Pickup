// @flow

import debug from 'debug';

import {
  gamemodes,
  regions,
} from '../../../config';

import generateRandomMaps from './utils/generate-random-maps';

const log = debug('TF2Pickup:pickup-queues:setup');

async function clearExistingPickup(app, pickup) {
  await app.service('pickup-queues').patch(pickup.id, {
    $set: {
      status: 'waiting-for-players',
      readyUpEnd: null,
      players: [],
      maps: generateRandomMaps(pickup.id, null),
    },
  });

  log(`Cleared existing pickup queue ${pickup.region} ${pickup.gamemode}`);
}

async function createNewPickup(app, region, gamemode) {
  const id = `${region}-${gamemode}`;

  await app.service('pickup-queues').create({
    region,
    gamemode,
    id,
    status: 'waiting-for-players',
    readyUpEnd: null,
    maps: generateRandomMaps(id, null),
    players: [],
  });

  log(`Created new pickup for ${region} ${gamemode}`);
}

export default function setup(app: App) {
  Object.keys(regions).forEach((region) => {
    Object.keys(gamemodes).forEach(async (gamemode) => {
      try {
        const pickup = await app.service('pickup-queues').get(`${region}-${gamemode}`);

        await clearExistingPickup(app, pickup);
      } catch (error) {
        if (error.code === 404) {
          await createNewPickup(app, region, gamemode);
        } else {
          log(`Unknown error while setting up pickup queues for ${region} ${gamemode}`, { error });
        }
      }
    });
  });
}
