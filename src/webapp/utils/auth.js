// @flow

import { API_ENDPOINT } from '../app';

export function redirectToSteamAuth() {
  window.location = `${API_ENDPOINT}/auth/steam`;
}

export function redirectToTwitchAuth() {
  window.location = `${API_ENDPOINT}/auth/twitch?url=${window.location.href}`;
}

