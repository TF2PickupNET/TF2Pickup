/**
 * Create a logout listener to set online to false and emit events.
 *
 * @param {Object} app - The feathers app object.
 * @returns {Function} - The actual callback for the logout event.
 */
export default function createLogoutListener(app) {
  return async (payload, { connection }) => {
    const logs = app.service('logs');
    const users = app.service('users');
    const update = {
      online: false,
      lastOnline: Date.now(),
    };

    try {
      await users.patch(connection.user.id, update);

      await logs.create({
        message: 'User logged out',
        environment: 'server',
        steamId: connection.user.id,
      });
    } catch (error) {
      await logs.create({
        message: 'Error on logout callback',
        environment: 'server',
        info: error,
        steamId: connection.user.id,
      });
    }
  };
}
