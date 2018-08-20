// @flow

import { type App } from '@feathersjs/feathers';

import store from '..';

import { updateSettings } from './actions';

export function events(app: App) {
  const users = app.service('user-settings');

  users.on('patched', (data) => {
    const user = store.getState().user;

    if (user && data.id === user.id) {
      store.dispatch(updateSettings(data));
    }
  });
}

export default events;
