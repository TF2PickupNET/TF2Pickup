import {
  useState,
  useEffect,
} from 'react';
// import { message } from 'antd';

import { socket } from '../../../app';

function useIsConnected() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = (reason: string) => {
      setIsConnected(false);

      // TODO: Check the reasons again
      switch (reason) {
        case 'io server disconnect': {
          // message.error('It seems our server just went down :(', 2);
          break;
        }
        case 'io client disconnect': {
          // message.error('You lost the connection to our server', 2);
          break;
        }
        default: console.log(reason);
      }
    };
    const handleReconnect = () => {
      // message.success('Successfully reconnected to our server', 1);
    };

    socket
      .on('connect', handleConnect)
      .on('reconnect', handleReconnect)
      .on('disconnect', handleDisconnect);

    socket.connect();

    return () => {
      socket
        .off('connect', handleConnect)
        .off('reconnect', handleReconnect)
        .off('disconnect', handleDisconnect);
    };
  }, []);

  return isConnected;
}

function useIsFirstConnect() {
  const [isFirstConnect, setIsFirstConnect] = useState(true);

  useEffect(() => {
    const handleConnect = () => {
      setIsFirstConnect(false);
    };
    const handleConnectError = () => {
      setIsFirstConnect(false);
    };

    socket
      .on('connect', handleConnect)
      .on('connect_error', handleConnectError);

    socket.connect();

    return () => {
      socket
        .off('connect', handleConnect)
        .off('connect_error', handleConnectError);
    };
  }, [isFirstConnect]);

  return isFirstConnect;
}

export {
  useIsConnected,
  useIsFirstConnect,
};