// @flow

import { type App } from '@feathersjs/feathers';

import store from '..';

import { updateProfile } from './actions';

export function events(app: App) {
  const users = app.service('user-profile');

  users.on('patched', (data) => {
    const user = store.getState().user;

    if (user && data.id === user.id) {
      store.dispatch(updateProfile(data));
    }
  });
}

export default events;
