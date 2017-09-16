import debug from 'debug';

import regions from '@tf2-pickup/configs/regions';

import gamemodes from '@tf2-pickup/configs/gamemodes';

const log = debug('TF2Pickup:pickup-queue:setup-db');

/**
 * Setup the database for the pickup queue.
 *
 * @param {Object} service - The pickup-queue service.
 */
export default function setupDb(service) {
  Object
    .keys(regions)
    .reduce(
      (current, region) => current.concat(
        Object
          .keys(gamemodes)
          .map((gamemode) => {
            return {
              gamemode,
              region,
            };
          }),
      ), [])
    .forEach(async (queue) => {
      const gamemodeQueue = await service.find({ query: queue });

      switch (gamemodeQueue.length) {
        case 0: {
          await service.create({
            ...queue,
            classes: Object
              .keys(gamemodes[queue.gamemode].slots)
              .reduce((current, slotName) => Object.assign({}, current, { [slotName]: [] }), {}),
          });

          break;
        }
        case 1: {
          await service.patch(gamemodeQueue.id, {
            classes: Object
              .keys(gamemodes[queue.gamemode].slots)
              .reduce((current, slotName) => {
                return Object.assign({}, current, { [slotName]: [] });
              }, {}),
          });

          break;
        }
        default: {
          log('Found multiple db entries for', queue);
          break;
        }
      }
    });
}
