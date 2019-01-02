import { useMemo } from 'react';

import store from './';
import {mapObjectValues} from "../../utils/object";

function useActions<Actions extends object>(actions: Actions): Actions {
  return useMemo(() => {
    return mapObjectValues(
      actions,
      // @ts-ignore
      (_, value) => (...args) => store.dispatch(value(...args)),
    );
  }, []);
}

export default useActions;
