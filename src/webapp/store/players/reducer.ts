import { State, Actions, PickupPlayerActionTypes } from './types';
import { createTypedAsyncItem } from '@webapp/store/utils';
import Player from '@typings/Player';

const defaultState = {};
const asyncItem = createTypedAsyncItem<Record<string, Player>>();

function reducer(state: State |  undefined = defaultState, action: Actions): State {
  switch (action.type) {
    case PickupPlayerActionTypes.FETCH_PLAYERS: {
      return {
        ...state,
        [action.payload.id]: asyncItem.createLoadingState(),
      };
    }
    case PickupPlayerActionTypes.FETCHED_PLAYERS: {
      return {
        ...state,
        [action.payload.id]: asyncItem.createFetchedState(
          action.payload.players.reduce<Record<string, Player>>((accu, player) => {
            return {
              ...accu,
              [player.id]: player,
            };
          }, {})
        ),
      };
    }
    case PickupPlayerActionTypes.ADD_PLAYER: {
      return {
        ...state,
        [action.payload.id]: asyncItem.createFetchedState({
          ...state[action.payload.id].item,
          [action.payload.player.id]: action.payload.player,
        }),
      };
    }
    case PickupPlayerActionTypes.UPDATE_PLAYER: {
      return {
        ...state,
        [action.payload.id]: asyncItem.createFetchedState({
          ...state[action.payload.id].item,
          [action.payload.player.id]: action.payload.player,
        }),
      };
    }
    case PickupPlayerActionTypes.REMOVE_PLAYER: {
      const players = state[action.payload.id].item;
      if (players === null) {
        return state;
      }

      const { [action.payload.playerId]: player, ...restPlayers } = players;

      return {
        ...state,
        [action.payload.id]: asyncItem.createFetchedState(restPlayers),
      };
    }
    default:
      return state;
  }
}

export default reducer;
