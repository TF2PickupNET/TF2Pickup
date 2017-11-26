/* eslint-disable camelcase */

import axios from 'axios';

/**
 * Reserve a server from serveme.tf.
 *
 * @param {String} url - The base url for the request.
 * This is needed because of different urls for na and eu.
 * @param {String} key - The api key for the requests.
 * @param {Number} reservationId - The id of the reservation.
 * @returns {Object} - Returns the data for the server and reservation.
 */
export default function servemeStrategy(url, key, reservationId) {
  const serveme = axios.create({
    baseURL: url,
    params: { api_key: key },
  });

  return serveme.delete(`api/reservations/${reservationId}.json`);
}
