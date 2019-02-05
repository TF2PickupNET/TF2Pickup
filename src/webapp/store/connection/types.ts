import { Action } from '@webapp/store';

interface State {
  isConnected: boolean,
  isFirstConnect: boolean,
}

enum ConnectionActionTypes {
  CONNECT = 'CONNECTION/CONNECT',
  DISCONNECT = 'CONNECTION/DISCONNECT',
  CONNECT_ERROR = 'CONNECTION/CONNECT_ERROR',

}

type Actions =
  | Action<typeof ConnectionActionTypes.CONNECT>
  | Action<typeof ConnectionActionTypes.DISCONNECT>;

export {
  State,
  ConnectionActionTypes,
  Actions,
};
