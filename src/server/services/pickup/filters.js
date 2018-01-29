export default {
  redirect(data, connection) {
    return data.users.includes(connection.user.id) ? data : false;
  },
};
