import {
  arrayToObject,
  pluck,
} from '../../../utils/functions';

import {
  updatePickup,
  updatePickups,
} from './actions';

const getRegion = pluck('user.settings.region', 'eu');

/**
 * Setup listeners for the current user store to change the store
 * when the user logs in, logs out or changes something of his settings.
 *
 * @param {Object} app - The feathers app.
 */
export default function setupListeners(app) {
  const pickupQueue = app.service('pickup-queue');

  pickupQueue.on('patched', (data) => {
    app.store.dispatch(updatePickup(data.gamemode, data));
  });

  app.on('state.change', async (prevState, newState) => {
    const prevRegion = getRegion(prevState);
    const nextRegion = getRegion(newState);

    if ((!prevState.connected && newState.connected) || prevRegion !== nextRegion) {
      const pickups = await pickupQueue.find({ query: { region: nextRegion } });

      app.store.dispatch(
        updatePickups(arrayToObject(pickup => pickup.gamemode)(pickups)),
      );
    }
  });
}
