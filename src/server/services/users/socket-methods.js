/**
 * Setup the socket methods for the users.
 *
 * @returns {null} - Returns null.
 */
export default function socketMethods(app, socket) {
  const users = app.service('users');

  socket.on('user.accept-rules', async () => {
    if (socket.feathers.user) {
      await users.patch(socket.feathers.user.id, { hasAcceptedTheRules: true });
    }
  });

  socket.on('user.change-region', async ({
    region,
    id,
  }) => {
    const currentUserId = socket.feathers.user.id;
    const userId = id || currentUserId;
    const isAllowed = true;

    if (isAllowed) {
      await users.patch(userId, { $set: { 'settings.region': region } });
    }
  });
}
