import { useMemo } from 'react';

import { mapObjectValues } from '@utils/object';

import store from '.';

function useActions<A extends object>(actions: A): A {
  return useMemo(() => mapObjectValues(
    actions,
    // @ts-ignore
    (_, value) => (...args) => store.dispatch(value(...args)),
  ), []);
}

export default useActions;
