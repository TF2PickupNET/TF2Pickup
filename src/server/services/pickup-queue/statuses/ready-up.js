import mapValues from 'lodash.mapvalues';

import gamemodes from '@tf2-pickup/configs/gamemodes';

export default async function readyUp(props) {
  const pickupId = props.id;
  const service = props.app.service('pickup-queue');
  const pickup = props.result;
  const enoughPlayersAreReady = Object.values(
    mapValues(pickup.classes, (players, className) => {
      const min = gamemodes[pickup.gamemode].slots[className];

      return players.filter(player => player.ready) >= min;
    }),
  ).every(value => value);

  if (enoughPlayersAreReady) {
    await service.patch(pickupId, {
      $set: {
        status: 'making-teams',
        readyUp: null,
      },
    });

    const players = mapValues(pickup.classes, (classPlayers, className) => {
      const min = gamemodes[pickup.gamemode].slots[className];

      return classPlayers
        .filter(player => player.ready)
        .slice(0, min);
    });

    // Generate teams with players here

    // Remove players from the queue
    // TODO: Generate a new sets of maps to be picked from
    await service.patch(pickupId, {
      $set: {
        status: 'waiting',
        classes: mapValues(
          pickup.classes,
          (classPlayers, className) => classPlayers.filter(
            player => players[className].includes(player.id),
          ),
        ),
      },
    });
  }

  return props;
}
