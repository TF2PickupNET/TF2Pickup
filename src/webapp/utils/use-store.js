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

function useMapState<MappedState: {}, Props: ?{}>(
  mapState: ((state: State, props: Props) => MappedState),
  props: Props,
): MappedState {
  const [mappedState, setMappedState] = useState(
    // Lazy initialization
    () => mapState(store.getState(), props),
  );

  // Track the current state and props
  // This is needed for not subscribing every time to the store when the props or state change
  const currentState = useRef(mappedState);
  const currentProps = useRef(props);

  // For updating the state
  const updateState = useCallback(() => {
    const nextState = mapState(store.getState(), currentProps.current);

    if (!shallowEqual(nextState, currentState.current)) {
      currentState.current = nextState;
      setMappedState(nextState);
    }
  }, [mapState]);

  // Rerun the mapStateToProps function whenever the props change
  useEffect(() => {
    currentProps.current = props;
    updateState();
  }, [props]);

  // Subscribe to store changes
  useEffect(
    () => store.subscribe(() => updateState()),
    [updateState],
  );

  return mappedState;
}

function useMakeMapState<MappedState: {}, Props: ?{}>(
  makeMapState: () => (state: State, props: Props) => MappedState,
  props: Props,
): MappedState {
  const mapState = useMemo(makeMapState, []);

  return useMapState(mapState, props);
}

export {
  useMakeMapState,
  useMapState,
};
