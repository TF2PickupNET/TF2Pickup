import {
  NotAuthenticated,
  BadRequest,
} from '@feathersjs/errors';
import { SocketConnection } from '@feathersjs/socketio';
import {
  SocketEventHandler,
  ServerApp,
} from '@feathersjs/feathers';
import debug from 'debug';

import emojiSets from '../../../../config/emoji-sets';

const log = debug('TF2Pickup:user-settings:events:change-emoji-set');

export default function onChangeEmojiSet(
  app: ServerApp,
  connection: SocketConnection,
): SocketEventHandler<'user-settings:change-emoji-set'> {
  const userSettings = app.service('user-settings');

  return async (data, cb) => {
    const user = connection.feathers.user;

    // Make sure a userId is authenticated
    if (!user) {
      return cb(new NotAuthenticated('You aren\'t authenticated!'));
    }

    if (!emojiSets[data.emojiSet]) {
      return cb(new BadRequest('Not a valid emoji set!'));
    }

    try {
      await userSettings.patch(user.id, { emojiSet: data.emojiSet });

      return cb(null);
    } catch (error) {
      log('Error while changing the emoji set', {
        userId: user.id,
        error,
        data,
      });

      return cb(error);
    }
  };
}
