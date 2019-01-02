// @flow

import React, { useEffect } from 'react';
import { type ContextRouter } from 'react-router-dom';

import { fetchPickups } from '../../store/pickup-queues/actions';
import { type State } from '../../store';
import { makeGetRegion } from '../../store/users/selectors';
import { getCurrentUserId } from '../../store/user-id/selectors';
import useActions from '../../store/use-actions';
import { useMakeMapState } from '../../store/use-store';
import gamemodes from '../../../config/gamemodes';

import Tabs from './Tabs';
import UnreadWarnings from './UnreadWarnings';

const makeMapState = () => {
  const getRegion = makeGetRegion();

  return (state: State) => {
    return { region: getRegion(state, getCurrentUserId(state)) };
  };
};

function PickupQueue(props: ContextRouter) {
  const actions = useActions({ fetchPickups });
  const { region } = useMakeMapState(makeMapState);
  const gamemode = props.location.pathname.slice(1);

  useEffect(() => {
    actions.fetchPickups();
  }, [region]);

  console.log(gamemode);

  return (
    <React.Fragment>
      <Helmet>
        <title>{gamemodes[gamemode].display}</title>
      </Helmet>
      <Tabs pathname={props.location.pathname} />

      <UnreadWarnings>
        Hello
      </UnreadWarnings>
    </React.Fragment>
  );
}

export default PickupQueue;
