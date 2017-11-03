import mapValues from 'lodash.mapvalues';
import debug from 'debug';
import gamemodes from '@tf2-pickup/configs/gamemodes';

const log = debug('TF2Pickup:pickup-queue:statuses:waiting');

/**
 * The after hook handler for the waiting status.
 *
 * @param {Object} props - The props passed to the hook.
 * @returns {Object} - Returns the not modified props.
 */
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
    log('Setting pickup into ready up state', pickupId);

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
        log('Resetting pickup into waiting state', pickupId);

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
