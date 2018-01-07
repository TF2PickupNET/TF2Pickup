import { omit } from '../../../utils/functions';

export default {
  patched(data, connection) {
    if (data.id !== connection.user.id) {
      return false;
    }

    return omit('elos', 'lastUpdate')(data);
  },
};
