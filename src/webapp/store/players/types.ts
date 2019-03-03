import { AsyncItem, Action } from '@webapp/store';
import Player from '@typings/Player';

type State = Record<
  string,
  AsyncItem<Record<string, Player>>
>;

enum PickupPlayerActionTypes {
  FETCH_PLAYERS = 'PLAYERS/FETCH-PLAYERS',
  FETCHED_PLAYERS = 'PLAYERS/FETCHED-PLAYERS',
  UPDATE_PLAYER = 'PLAYERS/UPDATE-PLAYER',
  ADD_PLAYER = 'PLAYERS/ADD-PLAYER',
  REMOVE_PLAYER = 'PLAYERS/REMOVE-PLAYER',
}

type Actions =
  | Action<typeof PickupPlayerActionTypes.FETCH_PLAYERS, { id: string | number }>
  | Action<typeof PickupPlayerActionTypes.FETCHED_PLAYERS, {
      id: string | number
      players: Player[],
    }>
  | Action<typeof PickupPlayerActionTypes.UPDATE_PLAYER, {
      id: string | number,
      player: Player,
    }>
  | Action<typeof PickupPlayerActionTypes.ADD_PLAYER, {
      id: string | number,
      player: Player,
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
