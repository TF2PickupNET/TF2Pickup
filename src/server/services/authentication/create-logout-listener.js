import debug from 'debug';

const log = debug('TF2Pickup:authentication:logout');

/**
 * Create a logout listener to set online to false and emit events.
 *
 * @param {Object} app - The feathers app object.
 * @returns {Function} - The actual callback for the logout event.
 */
export default function createLogoutListener(app) {
  return async (payload, { connection }) => {
    const users = app.service('users');
    const update = {
      online: false,
      lastOnline: Date.now(),
    };

    log('User logged out', connection.user.id);

    try {
      await users.patch(connection.user.id, update);
    } catch (error) {
      log('Error in logout callback', connection.user.id, error);
    }
  };
}
