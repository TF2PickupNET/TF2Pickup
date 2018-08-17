// @flow

export const API_ENDPOINT = window.location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : 'https://api.tf2pickup.net';
export const SOCKET_TIMEOUT = 2000;
