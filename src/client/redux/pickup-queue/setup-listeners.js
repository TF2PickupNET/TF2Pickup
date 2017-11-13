import {
  arrayToObject,
  pipe,
  pluck,
} from '../../../utils/functions';

import {
  updatePickup,
  updatePickups,
} from './actions';

/**
 * Fetch the pickups for the passed region.
 *
 * @param {Object} app - The app object.
 * @param {String} region - The regions name.
 */
async function fetchPickups(app, region) {
  const pickups = await app.service('pickup-queue').find({ query: { region } });

  pipe(
    arrayToObject('gamemode'),
    updatePickups,
    app.store.dispatch,
  )(pickups);
}

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
}
