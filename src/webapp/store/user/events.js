// @flow

import { type App } from '@feathersjs/feathers';

import store from '..';

import { updateUser } from './actions';

export function events(app: App) {
  const users = app.service('users');

  users.on('patched', (data) => {
    const user = store.getState().user;

    if (user && data.id === user.id) {
      store.dispatch(updateUser(data));
    }
  });
}

export default events;
