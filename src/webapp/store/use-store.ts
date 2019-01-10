import {
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import shallowEqual from 'shallowequal';

import store, { State } from '.';

function useMapState<MappedState>(
  mapState: (state: State) => MappedState,
): MappedState;
function useMapState<MappedState, Arg1>(
  mapState: (state: State, arg1: Arg1) => MappedState,
  arg1: Arg1,
): MappedState;
function useMapState<MappedState, Arg1, Arg2>(
  mapState: (state: State, arg1: Arg1, arg2: Arg2) => MappedState,
  arg1: Arg1,
  arg2: Arg2,
): MappedState;

function useMapState<MappedState, Args extends []>(
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

function useMakeMapState<MappedState>(
  mapState: () => (state: State) => MappedState,
): MappedState;
function useMakeMapState<MappedState, Arg1>(
  mapState: () => (state: State, arg1: Arg1) => MappedState,
  arg1: Arg1,
): MappedState;
function useMakeMapState<MappedState, Arg1, Arg2>(
  mapState: () => (state: State, arg1: Arg1, arg2: Arg2) => MappedState,
  arg1: Arg1,
  arg2: Arg2,
): MappedState;

function useMakeMapState<MappedState, Args extends []>(
  makeMapState: () => (state: State, ...args: Args) => MappedState,
  ...args: Args
): MappedState {
  const mapState = useCallback(makeMapState, []);

  // @ts-ignore
  return useMapState(mapState, ...args);
}

export {
  useMapState,
  useMakeMapState,
};
