import { State } from '@webapp/store';

const getIsConnected = (state: State) => state.connection.isConnected;

const getIsFirstConnect = (state: State) => state.connection.isFirstConnect;

export {
  getIsConnected,
  getIsFirstConnect,
};
