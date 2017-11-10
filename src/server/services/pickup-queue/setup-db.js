import debug from 'debug';
import {
  regions,
  gamemodes,
} from '@tf2-pickup/configs';

import {
  flatten,
  map,
  mapObject,
  pipe,
} from '../../../utils/functions';

import { generateRandomMaps } from './map-pool';

const log = debug('TF2Pickup:pickup-queue:setup-db');

/**
 * Setup the database for the pickup queue.
 *
 * @param {Object} service - The pickup-queue service.
 */
export default async function setupDb(service) {
  const pickups = await Promise.all(
    pipe(
      Object.keys,
      map(region => pipe(
        Object.keys,
        map(gamemode => Object.assign({
          gamemode,
          region,
        })),
      )(gamemodes)),
      flatten,
      map(pickup => service.get(`${pickup.region}-${pickup.gamemode}`)),
    )(regions),
  );

  await Promise.all(
    map(async (pickup) => {
      const classes = mapObject(() => [])(gamemodes[pickup.gamemode].slots);

      try {
        const queue = await service.get(`${pickup.region}-${pickup.gamemode}`);

        log('Resetting classes for pickup queue', pickup.region, pickup.gamemode);

        await service.patch(queue.id, {
          $set: {
            classes,
            status: 'waiting',
            maps: queue.maps.length === 0
              ? generateRandomMaps(pickup.region, pickup.gamemode)
              : queue.maps,
          },
        });
      } catch (error) {
        if (error.code === 404) {
          log('Creating new pickup queue', pickup.region, pickup.gamemode);

          await service.create({
            ...pickup,
            status: 'waiting',
            id: `${pickup.region}-${pickup.gamemode}`,
            classes,
            maps: generateRandomMaps(pickup.region, pickup.gamemode),
          });

          return;
        }

        log('Unknown error while getting pickup queue', pickup.region, pickup.gamemode, error);
      }
    })(pickups),
  );
}
