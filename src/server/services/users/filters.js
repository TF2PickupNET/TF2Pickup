export default {
  patched(data, connection) {
    if (data.id === connection.user.id) {
      return data;
    }

    return false;
  },
};
