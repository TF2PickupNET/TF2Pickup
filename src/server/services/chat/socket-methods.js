/**
 * Setup the sockets methods for the chat.
 *
 * @param {Object} app - The feathers app object.
 * @param {Object} socket - The socket connection.
 */
export default function socketMethods(app, socket) {
  socket.on('chat.new-message', (data) => {
    if (socket.feathers.user) {
      app.service('chat').create({
        userId: socket.feathers.user.id,
        message: data.message,
        chat: data.chat,
      });
    }
  });
}
