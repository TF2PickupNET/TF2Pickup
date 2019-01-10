import {
  useCallback,
  useState,
} from 'react';

import useIsMounted from './use-is-mounted';

function useAsync<Result>(fn: () => Promise<Result>) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [err, setError] = useState(null);
  const isMounted = useIsMounted();

  const run = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await fn();

      if (isMounted.current) {
        setResult(res);
      }
    } catch (error) {
      if (isMounted.current) {
        setError(error);
      }
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, [fn]);

  return {
    isLoading,
    result,
    error: err,
    run,
  };
}

export default useAsync;
