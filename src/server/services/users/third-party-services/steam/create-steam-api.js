import axios from 'axios';
import config from 'config';

/**
 * Create an axios instance wih some props for the steam api requests.
 *
 * @returns {Object} - Returns the axios instance.
 */
export default function createSteamApi() {
  return axios.create({
    baseURL: 'http://api.steampowered.com/',
    params: {
      key: config.get('service.steam.apikey'),
      format: 'json',
    },
  });
}
