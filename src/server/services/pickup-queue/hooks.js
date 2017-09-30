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
  before: {
    async patch(props) {
      const pickupId = props.id;
      const pickup = await props.app.service('pickup-queue').get(pickupId);

      switch (pickup.status) {
        case 'waiting': {
          return statuses.waiting(props);
        }

        default: return props;
      }
    }
  },

  after: {
    get: populatePickup,
    patch: populatePickup,
  },
};
