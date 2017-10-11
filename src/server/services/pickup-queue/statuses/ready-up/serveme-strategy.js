/* eslint-disable camelcase */

import axios from 'axios';
import { addMinutes } from 'date-fns';
import shuffle from 'lodash.shuffle';
import randomstring from 'randomstring';

export default async function servemeStrategy(url, key) {
  const response = await axios.post(`${url}/api/reservations/find_servers.json`, {
    params: { api_key: key },
    data: {
      starts_at: new Date().toISOString(),
      ends_at: addMinutes(new Date(), 90).toISOString(),
    },
  });

  const servers = shuffle(response.data.servers);
  const server = servers[0];
  const rcon = randomstring.generate();
  const password = randomstring.generate();
  const reservation = await axios.post(`${url}/api/reservations.json`, {
    params: { api_key: key },
    data: {
      starts_at: new Date().toISOString(),
      ends_at: addMinutes(new Date(), 90).toISOString(),
      rcon,
      password,
      tv_password: 'tf2pickuptv',
      server_id: server.id,
      enable_plugins: true,
    },
  });
}
