import { pluck } from '../../../utils/functions';

export default {
  created(data, connection) {
    const region = pluck('settings.region')(connection.user);

    if (data.chat === 'global' || data.chat === region) {
      return data;
    }

    return false;
  },

  patched(data, connection) {
    const region = pluck('settings.region')(connection.user);

    if (data.chat === 'global' || data.chat === region) {
      return data;
    }

    return false;
  },
};
