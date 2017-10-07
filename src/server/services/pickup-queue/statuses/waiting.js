import mapValues from 'lodash.mapvalues';

import gamemodes from '@tf2-pickup/configs/gamemodes';

export default async function waiting(props) {
  const pickupId = props.id;
  const service = props.app.service('pickup-queue');
  const pickup = props.result;
  const hasEnoughPlayers = Object.values(
    mapValues(pickup.classes, (players, className) => {
      const min = gamemodes[pickup.gamemode].slots[className];

      return players.length >= min;
    }),
  ).every(value => value);

  if (hasEnoughPlayers) {
    await service.patch(pickupId, {
      $set: {
        status: 'ready-up',
        readyUp: new Date(),
      },
    });

    setTimeout(async () => {
      const newPickup = await service.get(pickupId);

      // Still in ready up mode
      if (newPickup.status === 'ready-up') {
        const filterPlayers = players => players
          .filter(player => player.ready)
          .map(player => Object.assign({}, player, { ready: false }));

        await service.patch(pickupId, {
          $set: {
            status: 'waiting',
            classes: mapValues(newPickup.classes, filterPlayers),
            readyUp: null,
          },
        });
      }
    }, gamemodes[pickup.gamemode].readyUpTime * 1000);
  }

  return props;
}
