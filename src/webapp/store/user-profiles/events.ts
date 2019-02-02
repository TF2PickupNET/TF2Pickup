import { ClientApp } from '@feathersjs/feathers';

import store from '..';
import { UserProfileActionTypes } from './types';
import { makeGetProfileStatusById } from './selectors';
import { AsyncStatus } from '../types';

export function events() {
  const getUserProfileStatusById = makeGetProfileStatusById();

  return (app: ClientApp) => {
    const users = app.service('user-profiles');

    users.on('patched', (profile) => {
      const status = getUserProfileStatusById(store.getState(), profile.id);

      if (status !== AsyncStatus.NOT_STARTED) {
        store.dispatch({
          type: UserProfileActionTypes.UPDATE,
          payload: { profile },
        });
      }
    });
  };
}

export default events;
