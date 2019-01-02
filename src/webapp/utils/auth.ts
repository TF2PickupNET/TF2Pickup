import { API_ENDPOINT } from '../app';

function redirectToSteamAuth() {
  window.location.assign(`${API_ENDPOINT}/auth/steam?url=${window.location.href}`);
}

function redirectToTwitchAuth() {
  window.location.assign(`${API_ENDPOINT}/auth/twitch?url=${window.location.href}`);
}

export {
  redirectToSteamAuth,
  redirectToTwitchAuth,
};
