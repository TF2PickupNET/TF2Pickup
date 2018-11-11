// @flow

import {
  useEffect,
  useRef,
} from 'react';

export default function useIsMounted() {
  const isMounted = useRef<boolean>(true);

  useEffect(() => () => {
    isMounted.current = false;
  }, []);

  return isMounted;
}
