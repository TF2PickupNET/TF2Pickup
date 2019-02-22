import {
  useState,
  useRef,
  useCallback,
  useEffect, useMemo,
} from 'react';
import shallowEqual from 'shallowequal';

import store, { State } from '.';

type ValidArgs = Array<number | string | null | boolean>;

// Enforce easy types here
function useMapState<MappedState, Args extends ValidArgs>(
  mapState: (state: State, ...args: Args) => MappedState,
  ...args: Args
): MappedState {
  const currentData = useRef(args);

  const computeDerivedState = () => mapState(store.getState(), ...currentData.current);

  const [mappedState, setMappedState] = useState(computeDerivedState);
  // Track the current state and props
  // This is needed for not subscribing every time to the store when the props or state change
  const currentState = useRef(mappedState);

  // For updating the state
  const updateState = useCallback(() => {
    const nextState = computeDerivedState();

    if (!shallowEqual(nextState, currentState.current)) {
      currentState.current = nextState;
      setMappedState(nextState);
    }
  }, []);

  // Rerun the mapStateToProps function whenever the props change
  useEffect(() => {
    currentData.current = args;
    updateState();
  }, args);

  // Subscribe to store changes
  useEffect(
    () => store.subscribe(updateState),
    [store],
  );

  return mappedState;
}

// Enforce easy types here
function useMakeMapState<MappedState, Args extends ValidArgs>(
  makeMapState: () => (state: State, ...args: Args) => MappedState,
  ...args: Args
): MappedState {
  const mapState = useMemo(makeMapState, []);

  return useMapState(mapState, ...args);
}

export {
  useMapState,
  useMakeMapState,
};
