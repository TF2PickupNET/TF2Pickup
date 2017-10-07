import gamemodes from '@tf2-pickup/configs/gamemodes';

export default async function readyUp(props) {
  const pickupId = props.id;
  const service = props.app.service('pickup-queue');
  const pickup = props.result;
  const enoughPlayersAreReady = Object.values(
    Object
      .keys(pickup.classes)
      .reduce((current, className) => {
        const min = gamemodes[pickup.gamemode].slots[className];

        return {
          ...current,
          [className]: pickup.classes[className].filter(player => player.ready) >= min,
        };
      }, {}),
  ).every(value => value);

  if (enoughPlayersAreReady) {
    await service.patch(pickupId, {
      $set: {
        status: 'making-teams',
        readyUp: null,
      },
    });

    // Create teams here
  }

  return props;
}
