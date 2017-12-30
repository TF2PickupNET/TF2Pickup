import { pluck } from '../../../utils/functions';

import { addNotification } from './actions';

/**
 * Setup the listeners for the notifications and dispatch the action when we
 * receive a socket io event.
 *
 * @param {Object} app - The feathers app object.
 */
export default function setupListeners(app) {
  app.io.on('notifications.add', (data) => {
    const userId = pluck('user.id')(app.store.getState());

    if (data.forUsers === null || data.forUsers.includes(userId)) {
      app.store.dispatch(
        addNotification(data.message, data.options),
      );
    }
  });
}
