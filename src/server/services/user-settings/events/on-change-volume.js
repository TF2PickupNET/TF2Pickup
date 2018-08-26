// @flow

import { NotAuthenticated } from '@feathersjs/errors';
import { type App } from '@feathersjs/express';
import { type SocketConnection } from '@feathersjs/socketio';
import debug from 'debug';

type Data = { volume: number };

const log = debug('TF2Pickup:users:events:on-change-region');

export default function onChangeVolume(app: App, connection: SocketConnection) {
  const userSettings = app.service('user-settings');

  return async ({ volume }: Data, cb: (Error | null) => void) => {
    const user = connection.feathers.user;

    // Make sure a user is authenticated
    if (!user) {
      return cb(new NotAuthenticated('You aren\'t authenticated!'));
    }

    try {
      await userSettings.patch(user.id, { volume });

      return cb(null);
    } catch (error) {
      log('Error while accepting the rules', user.id, error);

      return cb(error);
    }
  };
}
