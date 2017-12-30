import { pluck } from '../../../utils/functions';

import { addNotification } from './actions';

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
