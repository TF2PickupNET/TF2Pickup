import {
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Location,
  Match,
  RouterHistory,
} from 'react-router-dom';
import { __RouterContext as RouterContext } from 'react-router';

function useHistory(): RouterHistory {
  const context = useContext(RouterContext);

  return context.history;
}

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

function useMatch<Return, DefaultValue>(
  selector: (match: Match) => Return | null,
  defaultValue: DefaultValue,
): Return | DefaultValue {
  const context = useContext(RouterContext);
  const getMatch = (): Return | DefaultValue => {
    const value = selector(context.match);

    return value === null ? defaultValue : value;
  };
  const [match, setMatch] = useState(getMatch);

  useEffect(
    () => context.history.listen(() => setMatch(getMatch)),
    [context],
  );

  return match;
}

export {
  useHistory,
  useLocation,
  useMatch,
};
