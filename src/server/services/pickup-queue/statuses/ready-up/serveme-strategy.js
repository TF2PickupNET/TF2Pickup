/* eslint-disable camelcase */

import axios from 'axios';
import { addMinutes } from 'date-fns';
import shuffle from 'lodash.shuffle';
import randomstring from 'randomstring';

const STV_PASSWORD = 'tf2pickuptv';

/**
 * Reserve a server from serveme.tf.
 *
 * @param {String} url - The base url for the request.
 * This is needed because of different urls for na and eu.
 * @param {String} key - The api key for the requests.
 * @returns {Object} - Returns the data for the server and reservation.
 */
export default async function servemeStrategy(url, key) {
  const serveme = axios.create({
    baseURL: url,
    params: { api_key: key },
  });
  const dates = {
    starts_at: new Date(),
    ends_at: addMinutes(new Date(), 90),
  };
  const response = await serveme.post('api/reservations/find_servers.json', dates);
  const servers = shuffle(response.data.servers);
  const server = servers[0];
  const rcon = randomstring.generate({ length: 12 });
  const password = randomstring.generate({ length: 12 });
  const reservation = await serveme.post('api/reservations.json', {
    reservation: {
      ...dates,
      rcon,
      password,
      tv_password: STV_PASSWORD,
      server_id: server.id,
      first_map: 'cp_badlands',
      enable_plugins: true,
    },
  });
  const port = parseInt(reservation.data.reservation.server.port, 10);

  return {
    data: {
      type: 'serveme',
      ip: reservation.data.reservation.server.ip,
      rcon,
      password,
      port,
      stvPort: port + 5,
      stvPassword: STV_PASSWORD,
      reservationId: reservation.data.reservation.id,
    },
    logSecret: reservation.data.reservation.logsecret.toString(),
  };
}
