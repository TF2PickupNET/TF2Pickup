import {
  arrayToObject,
  map,
  pipe,
  pluck,
} from '../../../utils/functions';
import { getDataForUserItem } from '../../../utils/users';

import {
  updateAllUsers,
  userCameOnline,
  userWentOffline,
} from './actions';

const getRegion = pluck('user.settings.region', 'eu');

/**
 * Setup listeners for the current user store to change the store
 * when the user logs in, logs out or changes something of his settings.
 *
 * @param {Object} app - The feathers app.
 */
export default function setupListeners(app) {
  const users = app.service('users');

  users.on('logout', (data) => {
    app.store.dispatch(userWentOffline(data.id));
  });

  users.on('login', (data) => {
    app.store.dispatch(userCameOnline(data));
  });

  app.on('state.change', async (prevState, newState) => {
    const prevRegion = getRegion(prevState);
    const nextRegion = getRegion(newState);

    if ((!prevState.connected && newState.connected) || prevRegion !== nextRegion) {
      const onlineUsers = await users.find({
        query: {
          'settings.region': nextRegion,
          online: true,
        },
      });

      pipe(
        map(getDataForUserItem),
        arrayToObject(user => user.id),
        updateAllUsers,
        app.store.dispatch,
      )(onlineUsers);
    }
  });
}
