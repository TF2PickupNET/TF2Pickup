import axios from 'axios';

/**
 * Create an axios instance wih some props for the steam api requests.
 *
 * @returns {Object} - Returns the axios instance.
 */
export default function createSteamApi() {
  return axios.create({
    baseURL: 'http://api.steampowered.com/',
    params: {
      key: process.env.STEAM_API_KEY,
      format: 'json',
    },
  });
}
