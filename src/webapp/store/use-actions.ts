import { useMemo } from 'react';
import { Keys } from '@utils/types';

import store, {
  AsyncAction,
  Actions,
} from '.';

type ActionCreator = (...args: any[]) => AsyncAction | Actions;
type ActionsMap = Record<string, ActionCreator>;

type ExtractReturnType<Fn extends ActionCreator> = ReturnType<Fn> extends AsyncAction
  ? ReturnType<ReturnType<Fn>>
  : ReturnType<Fn>;

type FnArgs<Fn extends ActionCreator> = Fn extends (...args: infer Args) => AsyncAction | Actions
  ? Args
  : never[];

type MappedActions<Map extends ActionsMap> = {
  [Key in keyof Map]: (...args: FnArgs<Map[Key]>) => ExtractReturnType<Map[Key]>
};

function useActions<Map extends ActionsMap>(actions: Map) {
  return useMemo(() => {
    const keys = Object.keys(actions) as Keys<typeof actions>;

    return keys.reduce<object>((mappedActions, key) => {
      return {
        ...mappedActions,
        [key]: (...args: any[]) => store.dispatch(actions[key](...args)),
      };
    }, {}) as MappedActions<Map>;
  }, []);
}

export default useActions;
