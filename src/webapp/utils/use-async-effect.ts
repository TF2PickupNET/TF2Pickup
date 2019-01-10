import { useEffect } from 'react';

import useIsMounted from './use-is-mounted';

export default function useAsyncEffect(fn: () => any, callback: () => void) {
  const isMounted = useIsMounted();

  const run =  async () => {
    await fn();

    if (isMounted.current) {
      callback();
    }
  };

  useEffect(() => {
    run();
  }, []);
}
