// @flow

import {
  NotAuthenticated,
  Forbidden,
} from '@feathersjs/errors';
import { type App } from '@feathersjs/express';
import { type SocketConnection } from '@feathersjs/socketio';
import debug from 'debug';

import { hasPermission } from '../../../../utils/has-permission';

type Data = {
  for: string,
  message: string,
};

const log = debug('TF2Pickup:warnings:on-add-warning');

export default function onCreate(app: App, connection: SocketConnection) {
  return async (data: Data, cb: (error: null | Error) => void) => {
    const currentUser = connection.feathers.user;

    // Make sure a userId is authenticated
    if (!currentUser) {
      return cb(new NotAuthenticated());
    }

    try {
      const user = await app.service('users').get(data.for);

      if (!hasPermission('warnings.create', currentUser, user)) {
        return cb(new Forbidden('You are not allowed to create a warning for that user'));
      }

      await app.service('warnings').create({
        for: data.for,
        message: data.message,
        from: currentUser.id,
      });

      return cb(null);
    } catch (error) {
      log('Error while creating a warning', {
        userId: currentUser.id,
        data,
        error,
      });

      return cb(error);
    }
  };
}
