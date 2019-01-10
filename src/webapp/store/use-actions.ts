import { useMemo } from 'react';

import { mapObjectValues } from '../../utils/object';

import store from '.';

function useActions<Actions extends Record<string, Function>>(actions: Actions): Actions {
  return useMemo(() => mapObjectValues(
    actions,
    // @ts-ignore
    (_, value) => (...args) => store.dispatch(value(...args)),
  ), []);
}

export default useActions;
