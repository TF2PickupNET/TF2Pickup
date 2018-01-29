import { pluck } from '@tf2-pickup/utils';

export default {
  patched(data, connection) {
    const region = pluck('user.settings.region', 'eu')(connection);

    return data.region === region ? data : false;
  },
};
