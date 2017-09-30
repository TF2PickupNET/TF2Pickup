import mapValues from 'lodash.mapvalues';

import gamemodes from '@tf2-pickup/configs/gamemodes';

export default async function waiting(props) {
  const pickupId = props.id;
  const service = props.app.service('pickup-queue');
  const pickup = await service.get(pickupId);
  const hasEnoughPlayers = Object.values(
    Object
      .keys(pickup.classes)
      .reduce((current, className) => {
        const min = gamemodes[pickup.gamemode].slots[className];

        return {
          ...current,
          [className]: pickup.classes[className].length >= min,
        };
      }, {}),
  ).every(value => value);

  const newData = props.data;

  if (hasEnoughPlayers) {
    newData.$set.status = 'ready-up';
    newData.$set.readyUp = new Date();

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

  return {
    ...props,
    data: newData,
  };
}
