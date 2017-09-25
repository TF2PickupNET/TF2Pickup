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
    .reduce((current, region) => current.concat(
      Object
        .keys(gamemodes)
        .map((gamemode) => {
          return {
            gamemode,
            region,
          };
        }),
    ), [])
    .forEach(async ({
      gamemode,
      region,
    }) => {
      const gamemodeQueue = await service.get(`${region}-${gamemode}`);
      const classes = Object
        .keys(gamemodes[gamemode].slots)
        .reduce((current, slotName) => Object.assign({}, current, { [slotName]: [] }), {});

      if (gamemodeQueue) {
        log('Resetting classes for pickup queue', region, gamemode);

        await service.patch(gamemodeQueue.id, { $set: { classes } });
      } else {
        log('Creating new pickup queue', region, gamemode);

        await service.create({
          region,
          gamemode,
          id: `${region}-${gamemode}`,
          classes,
        });
      }
    });
}
