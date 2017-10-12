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
      const classes = Object
        .keys(gamemodes[gamemode].slots)
        .reduce((current, slotName) => Object.assign({}, current, { [slotName]: [] }), {});

      try {
        const gamemodeQueue = await service.get(`${region}-${gamemode}`);

        log('Resetting classes for pickup queue', region, gamemode);

        await service.patch(gamemodeQueue.id, {
          $set: {
            classes,
            status: 'waiting',
          },
        });
      } catch (error) {
        if (error.code === 404) {
          log('Creating new pickup queue', region, gamemode);

          await service.create({
            region,
            gamemode,
            status: 'waiting',
            id: `${region}-${gamemode}`,
            classes,
          });

          return;
        }

        log('Unknown error while getting pickup queue', region, gamemode, error);
      }
    });
}
