// @flow

import { type ClientApp } from '@feathersjs/feathers';

import store from '..';

import { updateProfile } from './actions';

export function events() {
  return (app: ClientApp) => {
    const users = app.service('user-profiles');

    users.on('patched', (data) => {
      const user = store.getState().userProfiles[data.id];

      if (user) {
        store.dispatch(updateProfile(data));
      }
    });
  };
}

export default events;
