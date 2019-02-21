import { State } from '@webapp/store';

const getIsConnected = (state: State) => state.connection.isConnected;

const getIsFirstConnect = (state: State) => state.connection.isConnected;

export {
  getIsConnected,
  getIsFirstConnect,
};
