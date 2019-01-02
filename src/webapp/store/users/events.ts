import { ClientApp } from '@feathersjs/feathers';

import store from '..';

import { updateUser } from './actions';

export default function events() {
  return (app: ClientApp) => {
    app.service('users').on('patched', (data) => {
      const users = store.getState().users;

      if (users[data.id]) {
        store.dispatch(updateUser(data));
      }
    });
  };
}
