import { AsyncItem, Action } from '@webapp/store';
import PickupPlayer from '@typings/PickupPlayer';

type State = Record<
  string,
  AsyncItem<Record<string, PickupPlayer>>
>;

enum PickupPlayerActionTypes {
  FETCH_PLAYERS = 'PICKUP-PLAYERS/FETCH-PLAYERS',
  FETCHED_PLAYERS = 'PICKUP-PLAYERS/FETCHED-PLAYERS',
  UPDATE_PLAYER = 'PICKUP-PLAYERS/UPDATE-PLAYER',
  ADD_PLAYER = 'PICKUP-PLAYERS/ADD-PLAYER',
  REMOVE_PLAYER = 'PICKUP-PLAYERS/REMOVE-PLAYER',
}

type Actions =
  | Action<typeof PickupPlayerActionTypes.FETCH_PLAYERS, { id: string | number }>
  | Action<typeof PickupPlayerActionTypes.FETCHED_PLAYERS, {
      id: string | number
      players: PickupPlayer[],
    }>
  | Action<typeof PickupPlayerActionTypes.UPDATE_PLAYER, {
      id: string | number,
      player: PickupPlayer,
    }>
  | Action<typeof PickupPlayerActionTypes.ADD_PLAYER, {
      id: string | number,
      player: PickupPlayer,
    }>
  | Action<typeof PickupPlayerActionTypes.REMOVE_PLAYER, {
      id: string | number,
      playerId: string,
    }>
  ;

export {
  Actions,
  PickupPlayerActionTypes,
  State,
};
