// @flow

import React, { useEffect } from 'react';
import { type ContextRouter } from 'react-router-dom';

import { fetchPickups } from '../../store/pickup-queues/actions';
import { type State } from '../../store';
import { makeGetRegion } from '../../store/users/selectors';
import { getCurrentUserId } from '../../store/user-id/selectors';
import useActions from '../../utils/use-actions';
import { useMakeMapState } from '../../utils/use-store';

import Tabs from './Tabs';

const makeMapState = () => {
  const getRegion = makeGetRegion();

  return (state: State) => {
    return { region: getRegion(state, getCurrentUserId(state)) };
  };
};

function PickupQueue(props: ContextRouter) {
  const actions = useActions({ fetchPickups });
  const { region } = useMakeMapState(makeMapState);

  useEffect(() => {
    actions.fetchPickups();
  }, [region]);

  return (
    <React.Fragment>
      <Tabs pathname={props.location.pathname} />
    </React.Fragment>
  );
}

export default PickupQueue;
