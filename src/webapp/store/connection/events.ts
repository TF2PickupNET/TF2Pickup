import { socket } from '@webapp/app';
import store from '@webapp/store';
import { ConnectionActionTypes } from '@webapp/store/connection/types';

function events() {
  socket
    .on('connect', () => {
      store.dispatch({
        type: ConnectionActionTypes.CONNECT,
      });
    })
    .on('reconnect', () => {
      store.dispatch({
        type: ConnectionActionTypes.CONNECT,
      });
    })
    .on('disconnect', () => {
      store.dispatch({
        type: ConnectionActionTypes.DISCONNECT,
      });
    })
    .on('connect_error', () => {
      store.dispatch({
        type: ConnectionActionTypes.DISCONNECT,
      });
    });

  socket.connect();
}

export default events;
