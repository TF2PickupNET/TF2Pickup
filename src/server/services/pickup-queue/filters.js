import get from 'lodash.get';

export default {
  patched(data, connection) {
    const region = get(connection, 'user.settings.region', 'eu');

    return data.region === region ? data : false;
  },
};
