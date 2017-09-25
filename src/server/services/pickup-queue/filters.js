export default {
  patched(data, connection) {
    if (connection.user) {
      return data.region === connection.user.settings.region;
    }

    return false;
  },
};
