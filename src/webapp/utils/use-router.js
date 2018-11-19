// @flow

import {
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  type Location,
  type Match,
} from 'react-router-dom';
import { __RouterContext as RouterContext } from 'react-router';

import { def } from '../../utils/utils';

function useLocation(): Location {
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

function useMatch<R, D>(selector: (match: Match) => R | D, defaultValue: D): $NonMaybeType<R> | D {
  const context = useContext(RouterContext);
  const getMatch = () => {
    const value = selector(context.match);

    return def(value) ? value : defaultValue;
  };
  const [match, setMatch] = useState(getMatch);

  useEffect(
    () => context.history.listen(() => setMatch(getMatch)),
    [context],
  );

  return match;
}

export {
  useLocation,
  useMatch,
};
