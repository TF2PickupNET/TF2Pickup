import debug from 'debug';
import gamemodes from '@config/gamemodes';
import { Keys } from '@utils/types';
import { ServerApp } from '@feathersjs/feathers';

const log = debug('TF2Pickup:pickup-queues:has-enough-players-for-new-pickup');

/**
 * Check if the players from each class which joined first, have readied up.
 */
async function hasEnoughPlayersForNewPickup(
  app: ServerApp,
  queueId: string,
) {
  const pickupPlayers = app.service('pickup-players');
  const queues = app.service('pickup-queues');

  try {
    const { gamemode } = await queues.get(queueId);
    const { slots } = gamemodes[gamemode];
    const classNames = Object.keys(slots) as Keys<typeof slots>;

    const players = await Promise.all(
      classNames.map(async (className): Promise<[keyof typeof slots, number]> => {
        const playersForClass = await pickupPlayers.find({
          query: {
            pickupId: null,
            queueId,
            class: className,
            $limit: slots[className],
            // TODO: Make sure this is the correct sorting
            $sort: { joinedOn: 1 },
          },
        });

        return [
          className,
          playersForClass.filter(player => player.isReady).length,
        ];
      }),
    );

    return players.reduce(
      // @ts-ignore
      (hasEnough, [className, count]) => hasEnough && count == slots[className],
      true,
    );

  } catch (error) {
    log('Error while checking if enough players for new pickup', {
      error,
      data: { queueId },
    });

    return false;
  }
}

export default hasEnoughPlayersForNewPickup;
