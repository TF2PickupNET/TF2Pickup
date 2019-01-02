import { ClientApp } from '@feathersjs/feathers';

import store from '..';

import { updateSettings } from './actions';

export function events() {
  return (app: ClientApp) => {
    const users = app.service('user-settings');

    users.on('patched', (settings) => {
      const userId = store.getState().userId;

      if (settings.id === userId) {
        store.dispatch(updateSettings(settings));
      }
    });
  };
}

export default events;
