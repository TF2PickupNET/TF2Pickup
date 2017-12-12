/* eslint-disable promise/prefer-await-to-callbacks */

import {
  pipe,
  map,
  filter,
  reduce,
} from '../../../utils/functions';

/**
 * Get the valid names for a user.
 *
 * @param {Object} app - The feathers app object.
 * @param {Object} user - The users object.
 * @returns {Promise} - Returns a promise which will resolve with the valid names.
 */
async function getValidNames(app, user) {
  const services = Object
    .keys(user.services)
    .filter(service => service !== 'steam');
  const queries = await Promise.all(
    pipe(
      Object.keys,
      filter(service => service !== 'steam'),
      map(service => app.service('users').find({ query: { name: user.services[service].name } })),
    )(user.services),
  ).then(results => results.map((query, index) => {
    return {
      isValid: query.length === 0,
      name: services[index],
      username: user.services[services[index]].name,
    };
  }));

  return pipe(
    filter(service => service.isValid),
    reduce((obj, service) => {
      return {
        ...obj,
        [service.username]: [service.name].concat(obj[service.username] || []),
      };
    }, {}),
  )(queries);
}

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

  socket.on('user.change-region', async ({ region }, cb) => {
    if (socket.feathers.user) {
      await users.patch(socket.feathers.user.id, { $set: { 'settings.region': region } });
    }

    return cb();
  });

  socket.on('user.change-theme', async ({ theme }, cb) => {
    if (socket.feathers.user) {
      await users.patch(socket.feathers.user.id, { $set: { 'settings.theme': theme } });
    }

    return cb();
  });

  socket.on('user.change-volume', async ({ volume }, cb) => {
    if (socket.feathers.user) {
      await users.patch(socket.feathers.user.id, { $set: { 'settings.volume': volume } });
    }

    return cb();
  });

  socket.on('user.get-valid-names', async (cb) => {
    const currentUser = socket.feathers.user;

    if (!currentUser) {
      return cb(false);
    }

    const names = await getValidNames(app, currentUser);

    if (Object.keys(names).length === 1) {
      const name = Object.keys(names)[0];

      await app.service('users').patch(currentUser.id, { $set: { name } });

      return false;
    }

    return cb(names);
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
