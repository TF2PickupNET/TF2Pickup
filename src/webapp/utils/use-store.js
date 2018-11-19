// @flow

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import shallowEqual from 'shallowequal';

import store, { type State } from '../store';

// eslint-disable-next-line max-params
function useMapState<MappedState, Arg1, Arg2, Arg3>(
  mapState: (state: State, arg1: Arg1, arg2: Arg2, arg3: Arg3) => MappedState,
  arg1: Arg1,
  arg2: Arg2,
  arg3: Arg3,
): MappedState {
  const [mappedState, setMappedState] = useState(
    // Lazy initialization
    () => mapState(store.getState(), arg1, arg2, arg3),
  );

  // Track the current state and props
  // This is needed for not subscribing every time to the store when the props or state change
  const currentState = useRef(mappedState);
  const currentData = useRef([arg1, arg2, arg3]);

  // For updating the state
  const updateState = useCallback(() => {
    const nextState = mapState(store.getState(), ...currentData.current);

    if (!shallowEqual(nextState, currentState.current)) {
      currentState.current = nextState;
      setMappedState(nextState);
    }
  }, [mapState]);

  // Rerun the mapStateToProps function whenever the props change
  useEffect(() => {
    currentData.current = [arg1, arg2, arg3];
    updateState();
  }, [arg1, arg2, arg3]);

  // Subscribe to store changes
  useEffect(
    () => store.subscribe(() => updateState()),
    [updateState],
  );

  return mappedState;
}

// eslint-disable-next-line max-params
function useMakeMapState<MappedState, Arg1, Arg2, Arg3>(
  makeMapState: () => (state: State, arg1: Arg1, arg2: Arg2, arg3: Arg3) => MappedState,
  arg1: Arg1,
  arg2: Arg2,
  arg3: Arg3,
): MappedState {
  const mapState = useMemo(makeMapState, []);

  return useMapState(mapState, arg1, arg2, arg3);
}

export {
  useMakeMapState,
  useMapState,
};
