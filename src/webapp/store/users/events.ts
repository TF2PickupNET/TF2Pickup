import { ClientApp } from '@feathersjs/feathers';
import store, { AsyncStatus } from '@webapp/store';

import { UsersActionTypes } from './types';
import { makeGetUserStatusById } from './selectors';

export default function events() {
  const getUserStatusById = makeGetUserStatusById();

  return (app: ClientApp) => {
    app
      .service('users')
      .on('patched', (user) => {
        const status = getUserStatusById(store.getState(), user.id);

        // If we have already loaded the user, we update the data
        if (status !== AsyncStatus.NOT_STARTED) {
          store.dispatch({
            type: UsersActionTypes.UPDATE,
            payload: { user },
          });
        }
      });
  };
}
