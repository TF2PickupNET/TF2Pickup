/* eslint-disable promise/prefer-await-to-callbacks */

import {
  pipe,
  map,
  filter,
  reduce,
} from '../../../utils/functions';
import hasPermission from '../../../utils/has-permission';
import announcers from '../../../config/announcers';
import { getDataForUserItem } from '../../../utils/users';

const announcersArray = Object.values(announcers);

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
 * Get the announcers the user can select.
 *
 * @param {Object} user - The users object.
 * @returns {String[]} - Returns the selectable announcers for the user.
 */
function getValidAnnouncers(user) {
  if (hasPermission('announcers.use-without-buying', user)) {
    return map(announcer => announcer.name)(announcersArray);
  }

  return filter(
    announcer => !announcer.needsPurchase || user.boughtAnnouncers.includes(announcer.name),
    map(announcer => announcer.name),
  )(announcersArray);
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

  socket.on('user.change-region', async ({ region }, cb = () => {}) => {
    if (socket.feathers.user) {
      await users.patch(socket.feathers.user.id, { $set: { 'settings.region': region } });
    }

    return cb();
  });

  socket.on('user.change-theme', async ({ theme }, cb = () => {}) => {
    if (socket.feathers.user) {
      await users.patch(socket.feathers.user.id, { $set: { 'settings.theme': theme } });
    }

    return cb();
  });

  socket.on('user.change-volume', async ({ volume }, cb = () => {}) => {
    if (socket.feathers.user) {
      await users.patch(socket.feathers.user.id, { $set: { 'settings.volume': volume } });
    }

    return cb();
  });

  socket.on('user.change-announcer', async ({ announcer }, cb = () => {}) => {
    if (!socket.feathers.user) {
      return;
    }

    const validAnnouncers = getValidAnnouncers(socket.feathers.user);

    if (validAnnouncers.includes(announcer)) {
      await users.patch(socket.feathers.user.id, { $set: { 'settings.announcer': announcer } });
    }

    cb();
  });

  socket.on('user.alert', async ({ userId }) => {
    const user = await users.get(userId);

    if (hasPermission('user.alert', socket.feathers.user, user)) {
      app.io.emit('notifications.add', {
        forUsers: [userId],
        sound: 'alert',
        message: `You got alerted by ${socket.feathers.user.name}`,
      });
    }
  });

  socket.on('user.get-valid-names', async (cb) => {
    const currentUser = socket.feathers.user;

    if (!currentUser) {
      return cb(false);
    }

    const names = await getValidNames(app, currentUser);

    if (Object.keys(names).length === 1) {
      const name = Object.keys(names)[0];

      const user = await users.patch(currentUser.id, { $set: { name } });

      users.emit('login', getDataForUserItem(user));

      return false;
    }

    return cb(names);
  });

  socket.on('user.set-name', async (name, cb) => {
    if (socket.feathers.user) {
      const userWithName = await users.find({ query: { name } });

      if (userWithName.length === 0) {
        const user = await users.patch(socket.feathers.user.id, { $set: { name } });

        users.emit('login', getDataForUserItem(user));

        return cb({});
      }

      return cb({ error: `There is already a user with the name ${name}` });
    }

    return cb({ error: 'Not Authenticated!' });
  });
}
