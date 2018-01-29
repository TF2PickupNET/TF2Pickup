import axios from 'axios';
import config from 'config';

export default axios.create({
  baseURL: 'http://api.steampowered.com/',
  params: {
    key: config.get('service.steam.apikey'),
    format: 'json',
  },
});
