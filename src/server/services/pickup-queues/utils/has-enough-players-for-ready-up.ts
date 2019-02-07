import debug from 'debug';
import gamemodes from '@config/gamemodes';
import { Keys } from '@utils/types';
import { ServerApp } from '@feathersjs/feathers';

const log = debug('TF2Pickup:pickup-queues:has-enough-players-for-ready-up');

/**
 * Check if there are enough players for each class to start a ready up state.
 */
async function hasEnoughPlayersForReadyUp(
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
          },
        });

        return [className, playersForClass.length];
      }),
    );

    return players.reduce(
      // @ts-ignore
      (hasEnough, [className, count]) => hasEnough && count >= slots[className],
      true,
    );

  } catch (error) {
    log('Error while checking if enough players for ready up', {
      error,
      data: { queueId },
    });

    return false;
  }
}

export default hasEnoughPlayersForReadyUp;
