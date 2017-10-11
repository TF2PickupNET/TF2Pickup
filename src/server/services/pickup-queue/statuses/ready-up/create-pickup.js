import mapValues from 'lodash.mapvalues';

import gamemodes from '@tf2-pickup/configs/gamemodes';

import generateTeams from './generate-teams';
import reserveServer from './reserve-server';

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

  const [
    server,
    teams,
  ] = Promise.all(
    reserveServer(props),
    generateTeams(players),
  );

  let pickupId = 1;

  try {
    const lastPickup = await pickupService.find({
      limit: 1,
      sort: { launchedOn: -1 },
    });

    pickupId = lastPickup.id + 1;
  } catch (error) {

  }

  // Create a new pickup
  await pickupService.create({
    id: pickupId,
    teams,
    status: 'setting-up-server',
    serverId: server.id,
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
}
