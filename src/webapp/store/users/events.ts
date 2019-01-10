import { ClientApp } from '@feathersjs/feathers';

import store from '..';

import { updateUser } from './actions';

export default function events() {
  return (app: ClientApp) => {
    app
      .service('users')
      .on('patched', (data) => {
        const users = store.getState().users;

        if (data.id in users) {
          store.dispatch(updateUser(data));
        }
      });
  };
}
