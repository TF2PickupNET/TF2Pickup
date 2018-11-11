// @flow

import {
  useState,
  useEffect,
} from 'react';
import { message } from 'antd';

import app from '../../../app';

function useIsConnected() {
  const [isConnected, setIsConnected] = useState(false);
  const [isFirstConnect, setIsFirstConnect] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsFirstConnect(false), 5 * 1000);

    app.io.on('connect', () => {
      if (isFirstConnect) {
        setIsFirstConnect(false);
        clearTimeout(timeout);
      } else {
        message.info('You just connected back to our server!');
      }

      setIsConnected(true);
    });

    app.io.on('disconnect', () => {
      message.warn('We lost the connection to our server!');
      setIsConnected(false);
    });

    return () => clearTimeout(timeout);
  }, []);

  return {
    isConnected,
    isFirstConnect,
  };
}

export default useIsConnected;
