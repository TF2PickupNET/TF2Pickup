// @flow

import { type App } from '@feathersjs/feathers';

import store from '..';

import { updateUser } from './actions';

export default function events(app: App) {
  app.service('users').on('patched', (data) => {
    const users = store.getState().users;

    if (users[data.id]) {
      store.dispatch(updateUser(data));
    }
  });
}
