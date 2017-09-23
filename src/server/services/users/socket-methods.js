import errors from 'feathers-errors';

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
      .map((query, index) => {
        if (query.length === 0) {
          return services[index];
        }

        return null;
      })
      .filter(service => service !== null);

    return cb(
      validServices.map((service) => {
        return {
          serviceName: service,
          name: currentUser.services[service].name,
        };
      }),
    );
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
