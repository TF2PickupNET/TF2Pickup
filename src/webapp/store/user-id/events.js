// @flow

import { type ClientApp } from '@feathersjs/feathers';

import store from '..';

import { message } from 'antd';

import { loginUser } from './actions';

export default function events() {
  return (app: ClientApp) => {
    app.on('authenticated', async (payload: { accessToken: string }) => {
      const { id } = await app.passport.verifyJWT(payload.accessToken);

      message.success('Successfully authenticated');

      store.dispatch(loginUser(id));
    });
  };
}
