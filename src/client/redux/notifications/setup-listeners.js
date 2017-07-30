import { addNotification } from './actions';

/**
 * Setup the event listeners for the notifications.
 *
 * @param {Object} app - The feathers app.
 */
export default function setupListeners(app) {
  const notifications = app.service('notifications');

  notifications.on('create', (data) => {
    app.store.dispatch(addNotification(data));
  });
}
