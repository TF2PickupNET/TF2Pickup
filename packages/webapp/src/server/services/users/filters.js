import { omit } from '@tf2-pickup/utils';

export default {
  patched(data, connection) {
    if (data.id !== connection.user.id) {
      return false;
    }

    return omit('elos', 'lastUpdate')(data);
  },
};
