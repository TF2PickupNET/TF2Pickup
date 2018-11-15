// @flow

import {
  useContext,
  useEffect,
  useState,
} from 'react';
import { type Location } from 'react-router-dom';
import { __RouterContext as RouterContext } from 'react-router';

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
