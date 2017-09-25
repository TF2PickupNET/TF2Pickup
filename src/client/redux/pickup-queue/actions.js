import { UPDATE_PICKUP } from './constants';

export function updatePickup(gamemode, pickup) {
  return {
    type: UPDATE_PICKUP,
    payload: {
      gamemode,
      pickup,
    },
  };
}
