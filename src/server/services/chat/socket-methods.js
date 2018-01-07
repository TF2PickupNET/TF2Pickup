import { markdownFormatter } from './message-formatters';

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
    await app.service('chat').create({
      userId: socket.feathers.user.id,
      message: markdownFormatter(message),
      chat,
    });
  });
}
