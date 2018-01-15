import debug from 'debug';

import hasPermission from '../../../utils/has-permission';

import { markdownFormatter } from './message-formatters';

const log = debug('TF2Pickup:chat:socket-methods');

/**
 * Setup the socket methods for the chat.
 *
 * @param {Object} app - The feathers app object.
 * @param {Object} socket - The socket to add the listeners for.
 */
export default function socketMethods(app, socket) {
  socket.on('chat.add-message', async ({
    message,
    chat,
  }) => {
    if (socket.feathers.user) {
      log('Creating new chat message', message, chat, socket.feathers.user.id);

      await app.service('chat').create({
        userId: socket.feathers.user.id,
        message: markdownFormatter(message),
        chat,
      });
    }
  });

  socket.on('chat.delete-message', async ({ messageId }) => {
    try {
      const message = await app.service('chat').get(messageId);
      const user = await app.service('users').get(message.userId);

      if (hasPermission('chat.delete', socket.feathers.user, user)) {
        log('Deleting message from user', user.id, 'by', socket.feathers.user.id);

        await app.service('chat').patch(messageId, {
          $set: {
            removed: true,
            removedBy: socket.feathers.user.id,
          },
        });
      }
    } catch (error) {
      log('Error while trying to delete message', messageId, error);
    }
  });
}
