import axios from 'axios';
import config from 'config';

export default axios.create({
  baseURL: 'https://api.steampowered.com/',
  params: {
    key: config.get<string>('services.steam.apikey'),
    format: 'json',
  },
});
