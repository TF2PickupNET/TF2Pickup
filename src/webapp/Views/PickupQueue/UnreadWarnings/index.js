// @flow

import React, { type Node } from 'react';

import { makeGetUnreadWarningIdsForUser } from '../../../store/warnings/selectors';
import { getCurrentUserId } from '../../../store/user-id/selectors';
import { useMakeMapState } from '../../../store/use-store';
import Warnings from '../../../components/Warnings';

type Props = { children: Node };

const makeMapState = () => {
  const getWarningsForUser = makeGetUnreadWarningIdsForUser();

  return (state) => {
    return { warningIds: getWarningsForUser(state, getCurrentUserId(state)) };
  };
};

function UnreadWarnings(props: Props) {
  const { warningIds } = useMakeMapState(makeMapState);

  if (warningIds.length === 0) {
    return props.children;
  }

  return (
    <Warnings warningIds={warningIds} />
  );
}

export default UnreadWarnings;
