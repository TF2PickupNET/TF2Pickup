import flatten from 'lodash.flatten';

export default {
  after: {
    async patch(props) {
      const result = Object.assign({}, props.result);
      const classNames = Object.keys(result.classes);
      const usersService = props.app.service('users');
      const playerIds = flatten(
        Object.values(result.classes),
      ).map(player => player.id);
      const allUsers = await Promise.all(playerIds.map(playerId => usersService.get(playerId)));
      const users = allUsers.reduce((current, user) => {
        return {
          ...current,
          [user.id]: user,
        };
      }, {});

      classNames.forEach((className) => {
        result.classes[className] = result.classes[className].map((player) => {
          const user = users[player.id];

          return Object.assign({}, player, {
            name: user.name,
            avatar: user.services.steam.avatar.medium,
          });
        });
      });

      return {
        ...props,
        result,
      };
    },
  },
};
