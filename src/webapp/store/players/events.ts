import { ClientApp } from '@feathersjs/feathers';
import PickupPlayer from '@typings/Player';
import { PickupPlayerActionTypes } from '@webapp/store/players/types';
import store from '@webapp/store';

function getIdForPlayer(player: PickupPlayer) {
  if (player.queueId !== null && player.pickupId === null) {
    return player.queueId;
  }

  if (player.pickupId !== null && player.queueId === null) {
    return player.pickupId;
  }

  return null;
}

const events = (app: ClientApp) => {
  app
    .service('players')
    .on('created', (player) => {
      const id = getIdForPlayer(player);

      if (id === null) {
        return;
      }

      store.dispatch({
        type: PickupPlayerActionTypes.ADD_PLAYER,
        payload: {
          id,
          player,
        },
      });
    })
    .on('patched', (player) => {
      const id = getIdForPlayer(player);

      if (id === null) {
        return;
      }

      store.dispatch({
        type: PickupPlayerActionTypes.UPDATE_PLAYER,
        payload: {
          id,
          player,
        },
      });
    })
    .on('removed', (player) => {
      const id = getIdForPlayer(player);

      if (id === null) {
        return;
      }

      store.dispatch({
        type: PickupPlayerActionTypes.REMOVE_PLAYER,
        payload: {
          id,
          playerId: player.id,
        },
      });
    });
};

export default events;
