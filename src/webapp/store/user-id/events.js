// @flow

import { type ClientApp } from '@feathersjs/feathers';

import store from '..';

import {
  loginUser,
  logoutUser,
} from './actions';

export default function events() {
  return (app: ClientApp) => {
    app.on('logout', () => {
      store.dispatch(logoutUser());
    });

    app.on('authenticated', async (payload: { accessToken: string }) => {
      const { id } = await app.passport.verifyJWT(payload.accessToken);

      store.dispatch(loginUser(id));
    });
  };
}
