import debug from 'debug';
import gamemodes from '@config/gamemodes';
import { Keys } from '@utils/types';
import { ServerApp } from '@feathersjs/feathers';
import PickupQueue from '@typings/PickupQueue';
import PickupPlayer from '@typings/PickupPlayer';

const log = debug('TF2Pickup:pickup-queues:has-enough-players');

/**
 * Check if the players from each class which joined first, have readied up.
 */
async function hasEnoughPlayers(
  app: ServerApp,
  queue: PickupQueue,
  getPlayerCount: (players: PickupPlayer[], min: number) => number,
) {
  const pickupPlayers = app.service('pickup-players');
  const { slots } = gamemodes[queue.gamemode];
  const classNames = Object.keys(slots) as Keys<typeof slots>;

  try {
    const players = await Promise.all(
      classNames.map(async (className): Promise<[keyof typeof slots, PickupPlayer[]]> => {
        const playersForClass = await pickupPlayers.find({
          query: {
            pickupId: null,
            queueId: queue.id,
            class: className,
            // TODO: Make sure this is the correct sorting
            $sort: { joinedOn: 1 },
          },
        });

        return [
          className,
          playersForClass,
        ];
      }),
    );

    return players.reduce((accu, [className, classPlayers]) => {
      const min = slots[className] || 0;

      return accu && getPlayerCount(classPlayers, min) >= min;
    }, true);
  } catch (error) {
    log('Error while checking if enough players', {
      error,
      data: { queueId: queue.id },
    });

    return false;
  }
}

export default hasEnoughPlayers;
