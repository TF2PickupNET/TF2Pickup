/* eslint-disable promise/prefer-await-to-callbacks */

/**
 * Setup the socket methods for the users.
 *
 * @param {Object} app - The feathers app object.
 * @param {Object} socket - The socket connection.
 */
export default function socketMethods(app, socket) {
  const users = app.service('users');

  socket.on('user.accept-rules', async () => {
    if (socket.feathers.user) {
      await users.patch(socket.feathers.user.id, { hasAcceptedTheRules: true });
    }
  });

  socket.on('user.change-region', async ({ region }) => {
    if (socket.feathers.user) {
      await users.patch(socket.feathers.user.id, { $set: { 'settings.region': region } });
    }
  });

  socket.on('user.change-theme', async ({ theme }) => {
    if (socket.feathers.user) {
      await users.patch(socket.feathers.user.id, { $set: { 'settings.theme': theme } });
    }
  });

  socket.on('user.get-valid-names', async (cb) => {
    const currentUser = socket.feathers.user;
    const services = Object
      .keys(currentUser.services)
      .filter(service => service !== 'steam');

    const serviceNameQueries = await Promise.all(
      services
        .map(service => currentUser.services[service].name)
        .map(name => users.find({ query: { name } })),
    );

    const validServices = serviceNameQueries
      .filter(query => query.length === 0)
      .map((query, index) => services[index])
      .map((service) => {
        return {
          serviceName: service,
          name: currentUser.services[service].name,
        };
      });

    if (validServices.length === 1) {
      const name = validServices[0].name;

      await users.patch(currentUser.id, { $set: { name } });

      return cb(false);
    }

    return cb(validServices);
  });

  socket.on('user.set-name', async (name, cb) => {
    if (socket.feathers.user) {
      const userWithName = await users.find({ query: { name } });

      if (userWithName.length === 0) {
        await users.patch(socket.feathers.user.id, { $set: { name } });

        return cb({});
      }

      return cb({ error: `There is already a user with the name ${name}` });
    }

    return cb({ error: 'Not Authenticated!' });
  });
}
