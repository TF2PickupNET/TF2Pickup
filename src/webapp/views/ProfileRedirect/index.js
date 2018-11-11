// @flow

import React from 'react';
import { Redirect } from 'react-router-dom';

import { getCurrentUserId } from '../../store/user-id/selectors';
import { useMapState } from '../../utils/use-store';
import { type State } from '../../store';

const mapState = (state: State) => {
  return { userId: getCurrentUserId(state) };
};

export default function ProfileRedirect() {
  const { userId } = useMapState(mapState);

  return (
    <Redirect to={userId === null ? '/' : `/profile/${userId}`} />
  );
}
