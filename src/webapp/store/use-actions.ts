import { useMemo } from 'react';

import { mapObjectValues } from '../../utils/object';

import store from '.';
import Actions from './actions';

type ActionMap = Record<string, <Args extends any[]>(...args: Args) => Actions>;

function useActions<A extends ActionMap>(actions: A): A {
  return useMemo(() => mapObjectValues(
    actions,
    // @ts-ignore
    (_, value) => (...args) => store.dispatch(value(...args)),
  ), []);
}

export default useActions;
