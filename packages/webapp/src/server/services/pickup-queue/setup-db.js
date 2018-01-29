import debug from 'debug';
import {
  regions,
  gamemodes,
} from '@tf2-pickup/config';
import {
  flatten,
  map,
  mapObject,
  pipe,
} from '@tf2-pickup/utils';

import generateRandomMaps from './generate-random-maps';

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
    )(regions),
  );

  await Promise.all(
    map(async (pickup) => {
      const classes = mapObject(() => [])(gamemodes[pickup.gamemode].slots);
      const [queue] = await service.find({ query: { id: `${pickup.region}-${pickup.gamemode}` } });

      if (queue) {
        log('Resetting classes for pickup queue', pickup.region, pickup.gamemode);

        return service.patch(queue.id, {
          $set: {
            classes,
            status: 'waiting',
            maps: queue.maps.length === 0
              ? generateRandomMaps(pickup.region, pickup.gamemode)
              : queue.maps,
          },
        });
      }

      log('Creating new pickup queue', pickup.region, pickup.gamemode);

      return service.create({
        ...pickup,
        status: 'waiting',
        id: `${pickup.region}-${pickup.gamemode}`,
        classes,
        maps: generateRandomMaps(pickup.region, pickup.gamemode),
      });
    })(pickups),
  );
}
