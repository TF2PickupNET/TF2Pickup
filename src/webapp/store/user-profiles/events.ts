import { ClientApp } from '@feathersjs/feathers';

import store from '..';

import { updateProfile } from './actions';

export function events() {
  return (app: ClientApp) => {
    const users = app.service('user-profiles');

    users.on('patched', (data) => {
      const profiles = store.getState().userProfiles;

      if (data.id in profiles) {
        store.dispatch(updateProfile(data));
      }
    });
  };
}

export default events;
