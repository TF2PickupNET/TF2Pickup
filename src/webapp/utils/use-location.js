// @flow

import {
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  __RouterContext as RouterContext,
  type Location,
} from 'react-router-dom';

export default function useLocation(): Location {
  const context = useContext(RouterContext);
  const [, update] = useState<boolean>(false);

  useEffect(
    () => {
      const handleChange = () => update(val => !val);

      return context.history.listen(handleChange);
    },
    [context],
  );

  return context.location;
}
