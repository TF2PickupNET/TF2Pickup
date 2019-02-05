import { socket } from '@webapp/app';

function handleConnect() {}
function handleReconnect() {}
function handleDisconnect() {}
function handleConnectError() {}

function events() {
  return () => {
    socket
      .on('connect', handleConnect)
      .on('reconnect', handleReconnect)
      .on('disconnect', handleDisconnect)
      .off('connect_error', handleConnectError);

    socket.connect();
  };
}

export default events;
