import useIsMounted from "./use-is-mounted";
import {useEffect} from "react";

export default function useAsyncEffect(fn: () => any, callback: () => void) {
  const isMounted = useIsMounted();

  // @ts-ignore: The react definition doesn't allow for async functions inside useEffect
  useEffect(async () => {
    await fn();

    if (isMounted.current) {
      callback();
    }
  }, []);
}
