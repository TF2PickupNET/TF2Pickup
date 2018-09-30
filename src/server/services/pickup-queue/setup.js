// @flow

import debug from 'debug';

import {
  gamemodes,
  regions,
} from '../../../config';

const log = debug('TF2Pickup:pickup-queue:setup');

async function clearExistingPickup(app, pickup) {
  await app.service('pickup-queue').patch(pickup.id, {
    status: 'waiting-for-players',
    readyUpEnd: null,
  });

  log(`Cleared existing pickup queue ${pickup.region} ${pickup.gamemode}`);
}

async function createNewPickup(app, region, gamemode) {
  await app.service('pickup-queue').create({
    region,
    gamemode,
    id: `${region}-${gamemode}`,
    status: 'waiting-for-players',
    readyUpEnd: null,
  });

  log(`Created new pickup for ${region} ${gamemode}`);
}

export default function setup(app: App) {
  Object.keys(regions).forEach((region) => {
    Object.keys(gamemodes).forEach(async (gamemode) => {
      try {
        const pickup = await app.service('pickup-queue').get(`${region}-${gamemode}`);

        await clearExistingPickup(app, pickup);
      } catch (error) {
        if (error.code === 404) {
          await createNewPickup(app, region, gamemode);
        } else {
          log(`Unknown error while setting up pickup queues for ${region} ${gamemode}`);
        }
      }
    });
  });
}
