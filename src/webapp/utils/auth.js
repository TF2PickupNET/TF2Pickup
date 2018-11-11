// @flow

import { API_ENDPOINT } from '../app';

function redirectToSteamAuth() {
  window.location = `${API_ENDPOINT}/auth/steam?url=${window.location.href}`;
}

function redirectToTwitchAuth() {
  window.location = `${API_ENDPOINT}/auth/twitch?url=${window.location.href}`;
}

export {
  redirectToSteamAuth,
  redirectToTwitchAuth,
};
