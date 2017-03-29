export default {
  patched(data, connection) {
    if (data.id === connection.user.id) {
      return data;
    }

    return false;
  },

  userLoggedIn(data, connection) {
    const user = connection.user || {};

    if (data.id === user.id) {
      return false;
    }

    const region = user.settings ? user.settings.region : 'eu';

    if (data.region !== region) {
      return false;
    }

    return data;
  },

  userLoggedOut(data, connection) {
    const user = connection.user || {};
    const region = user.settings ? user.settings.region : 'eu';

    if (data.region !== region) {
      return false;
    }

    return data;
  },
};
