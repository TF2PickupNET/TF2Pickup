import { updatePickup } from './actions';

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
