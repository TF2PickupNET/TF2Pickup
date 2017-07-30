import axios from 'axios';

export default axios.create({
  baseURL: 'http://api.steampowered.com/',
  params: {
    key: process.env.STEAM_API_KEY,
    format: 'json',
  },
});
