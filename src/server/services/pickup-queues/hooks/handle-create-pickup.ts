import getPlayersForPickup from '@server/services/pickup-queues/utils/get-players-for-pickup';
import { getMinPlayersForGamemode } from '@config/gamemodes';
import sleep from 'sleep-promise';
import { ServerApp } from '@feathersjs/feathers';
import resetQueue from '@server/services/pickup-queues/utils/reset-queue';
import { GeneralError } from '@feathersjs/errors';
import { PickupQueueStates } from '@config/pickup-queue-states';
import debug from 'debug';

const log = debug('TF2Pickup:pickup-queues:create-new-pickup');

async function handleCreatePickup(app: ServerApp, queueId: string) {
  const queues = app.service('pickup-queues');
  const users = app.service('users');
  const pickupPlayers = app.service('pickup-players');

  try {
    const queue = await queues.get(queueId);
    const players = await getPlayersForPickup(app, queue);

    if (players.length !== getMinPlayersForGamemode(queue.gamemode)) {
      await sleep(1000);

      // Throw an error, so we can catch it and reset the queue
      throw new GeneralError();
    }

    // TODO: Add pickup creation
    const pickup = { id: 1 };

    await Promise.all(
      players.map(player => pickupPlayers.patch(player.id, {
        queueId: null,
        pickupId: pickup.id,
      })),
    );

    // TODO: New maps generation
    const maps: [string, string, string] = ['', '', ''];

    await queues.patch(queueId, {
      state: PickupQueueStates.WaitingForPlayers,
      maps,
    });

    await Promise.all(
      players.map(player => users.patch(player.userId, { lastPickup: pickup.id }))
    );

    const otherPlayers = await pickupPlayers.find({
      query: {
        queueId,
        pickupId: null,
      },
    });

    // Reset the other players and their map picks if the maps have changed
    await Promise.all(
      otherPlayers.map((player) => {
        if (player.map !== null && maps.includes(player.map)) {
          return player;
        }

        return pickupPlayers.patch(player.id, { map: null });
      })
    );
  } catch (error) {
    log('Error while creating new pickup -> resetting queue', {
      error,
      data: { queueId },
    });

    // Reset the queue to a normal state when we get an error here
    await resetQueue(app, queueId);
  }
}

export default handleCreatePickup;
