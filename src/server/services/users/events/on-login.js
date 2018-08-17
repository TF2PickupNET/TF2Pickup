// @flow

import { type App } from '@feathersjs/express';
import { type Connection } from '@feathersjs/feathers';
import debug from 'debug';

const log = debug('TF2Pickup:users:events:on-login');

export default function onLogin(app: App, connection: Connection) {
  return async () => {
    try {
      await app.service('users').patch(connection.user.id, { online: true });
    } catch (error) {
      log('Error in login callback', error);
    }
  };
}
