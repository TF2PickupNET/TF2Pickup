import mapValues from 'lodash.mapvalues';
import debug from 'debug';
import gamemodes from '@tf2-pickup/configs/gamemodes';

import createPickup from './create-pickup';

const log = debug('TF2Pickup:pickup-queue:statuses:ready-up');

/**
 * The handler for the ready up status.
 *
 * @param {Object} props - The props from the hook.
 * @returns {Object} - Returns the not modified props for the hook.
 */
export default async function readyUp(props) {
  const pickupId = props.id;
  const service = props.app.service('pickup-queue');
  const pickup = props.result;
  const enoughPlayersAreReady = Object.values(
    mapValues(pickup.classes, (players, className) => {
      const min = gamemodes[pickup.gamemode].slots[className];

      return players.filter(player => player.ready).length >= min;
    }),
  ).every(value => value);

  if (enoughPlayersAreReady) {
    log('Enough players are ready, creating teams', pickupId);

    /*
    await service.patch(pickupId, {
      $set: {
        status: 'creating-teams',
        readyUp: null,
      },
    });
    */
    createPickup(props);
  }

  return props;
}
