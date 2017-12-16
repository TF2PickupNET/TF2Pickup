import { pluck } from '../../../utils/functions';

export default {
  patched(data, connection) {
    const region = pluck('user.settings.region', 'eu')(connection);

    return data.region === region ? data : false;
  },
};
