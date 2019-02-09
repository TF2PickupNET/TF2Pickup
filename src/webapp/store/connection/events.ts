import { socket } from '@webapp/app';

function handleConnect() {
  // TODO: Implement
}
function handleReconnect() {
  // TODO: Implement
}
function handleDisconnect() {
  // TODO: Implement
}
function handleConnectError() {
  // TODO: Implement
}

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
