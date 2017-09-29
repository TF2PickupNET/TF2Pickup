import flatten from 'lodash.flatten';

async function populatePickup(pickup, app) {
  const newPickup = { ...pickup };
  const classNames = Object.keys(newPickup.classes);
  const usersService = app.service('users');
  const playerIds = flatten(
    Object.values(newPickup.classes),
  ).map(player => player.id);
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

  return newPickup;
}

export default {
  after: {
    async get(props) {
      const pickup = await populatePickup(props.result, props.app);

      return {
        ...props,
        result: pickup,
      };
    },
    async patch(props) {
      const pickup = await populatePickup(props.result, props.app);

      return {
        ...props,
        result: pickup,
      };
    },
  },
};
