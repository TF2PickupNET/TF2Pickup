import mapValues from 'lodash.mapvalues';
import flatten from 'lodash.flatten';

import gamemodes from '@tf2-pickup/configs/gamemodes';

import generateTeams from './generate-teams';
import reserveServer from './reserve-server';

/**
 * Create a new pickup when enough players are ready.
 *
 * @param {Object} props - The props from the hook.
 */
export default async function createPickup(props) {
  const pickupQueue = props.result;
  const pickupService = props.app.service('pickup');
  const pickupQueueService = props.app.service('pickup-queue');
  const players = mapValues(pickupQueue.classes, (classPlayers, className) => {
    const min = gamemodes[pickupQueue.gamemode].slots[className];

    return classPlayers
      .filter(player => player.ready)
      .slice(0, min);
  });

  try {
    const [
      server,
      teams,
    ] = Promise.all(
      reserveServer(props),
      generateTeams(players),
    );
    const lastPickup = await pickupService.find({
      limit: 1,
      sort: { id: -1 },
    });
    const pickupId = lastPickup[0] ? lastPickup[0].id + 1 : 1;

    // Create a new pickup
    await pickupService.create({
      id: pickupId,
      teams,
      status: 'setting-up-server',
      serverId: server.id,
      logSecret: server.logSecret,
    });

    // Reset the pickup queue to waiting status and remove the players from the queue
    await pickupQueueService.patch(props.id, {
      $set: {
        status: 'waiting',
        classes: mapValues(
          pickupQueue.classes,
          classPlayers => classPlayers.filter(player => !players.includes(player.id)),
        ),
      },
    });

    props.app.io.emit('pickup.redirect', {
      pickupId,
      players,
    });
  } catch (error) {
    // Reset the pickup queue to waiting status and remove the players from the queue
    await pickupQueueService.patch(props.id, { $set: { status: 'waiting' } });

    props.app.io.emit('notifications.add', {
      forUsers: flatten(Object.values(players)),
      message: error.message,
    });
  }
}
