import axios from 'axios';
import { addMinutes } from 'date-fns';
import shuffle from 'lodash.shuffle';

export default async function servemeStrategy(url, key) {
  const response = await axios.post(`${url}/api/reservations/find_servers.json`, {
    params: { api_key: key }, // eslint-disable-line camelcase
    data: {
      starts_at: new Date().toISOString(), // eslint-disable-line camelcase
      ends_at: addMinutes(new Date(), 90).toISOString(), // eslint-disable-line camelcase
    },
  });

  const servers = shuffle(response.data.servers);
  const server = servers[0];
  const reservation = await axios.post(`${url}/api/reservations`);
}
