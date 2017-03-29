import is from 'is_js';
import SteamID from 'steamid';

export function url({
  msg = '{VALUE} is not a valid url!',
  nullIsAllowed = false,
} = {}) {
  return [
    value => is.url(value) || (nullIsAllowed && value === null),
    msg,
  ];
}

export function steamId({
  msg = '{VALUE} is not a valid Steam ID!',
  nullIsAllowed = false,
} = {}) {
  return [
    id => new SteamID(id).isValid() || (nullIsAllowed && id === null),
    msg,
  ];
}

export function isInArray(array, {
  msg = '{VALUE} is not in the Array!',
  nullIsAllowed = false,
} = {}) {
  return [
    value => array.includes(value) || (nullIsAllowed && value === null),
    msg,
  ];
}
