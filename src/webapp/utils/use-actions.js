// @flow

import { useMemo } from 'react';

import store from '../store';

function useActions<Actions: {}>(actions: Actions): Actions {
  return useMemo((): Actions => {
    const memoizedActions = actions;

    // $FlowFixMe
    return Object
      .keys(actions)
      .reduce((accu, key) => {
        return {
          ...accu,
          [key]: (...args) => store.dispatch(memoizedActions[key](...args)),
        };
      }, {});
  }, []);
}

export default useActions;
