import playSound from '../../utils/play-sound';

import { addNotification } from './actions';

/**
 * Setup the listeners for the notifications and dispatch the action when we
 * receive a socket io event.
 *
 * @param {Object} app - The feathers app object.
 */
export default function setupListeners(app) {
  app.service('notifications').on('created', (notification) => {
    app.store.dispatch(
      addNotification(notification.message, notification.options),
    );

    if (notification.sound) {
      playSound(notification.sound);
    }
  });
}
