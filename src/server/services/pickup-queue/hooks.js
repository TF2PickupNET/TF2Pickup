import flatten from 'lodash.flatten';

import statuses from './statuses';

async function populatePickup(props) {
  const newPickup = { ...props.result };
  const classNames = Object.keys(newPickup.classes);
  const usersService = props.app.service('users');
  const playerIds = flatten(Object.values(newPickup.classes)).map(player => player.id);
  const allUsers = await Promise.all(playerIds.map(playerId => usersService.get(playerId)));
  const users = allUsers.reduce((current, user) => {
    return {
      ...current,
      [user.id]: user,
    };
  }, {});

  classNames.forEach((className) => {
    newPickup.classes[className] = newPickup.classes[className].map((player) => {
      const user = users[player.id];

      return Object.assign({}, player, {
        name: user.name,
        avatar: user.services.steam.avatar.medium,
      });
    });
  });

  return {
    ...props,
    result: newPickup,
  };
}

export default {
  after: {
    get: populatePickup,
    patch: [
      (props) => {
        switch (props.result.status) {
          case 'waiting': {
            return statuses.waiting(props);
          }

          case 'ready-up': {
            return statuses.readyUp(props);
          }

          default: return props;
        }
      },
      populatePickup,
    ],
  },
};
