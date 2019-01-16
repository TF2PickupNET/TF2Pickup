import React from 'react';
import { Redirect } from 'react-router-dom';

import { getCurrentUserId } from '../../store/user-id/selectors';
import { useMapState } from '../../store/use-store';
import { State } from '../../store';

import Navigation from './Navigation';
import { useUserId } from './utils';
import RequireLogin from '../../components/RequireLogin';

const mapState = (state: State) => {
  return { currentUserId: getCurrentUserId(state) };
};

function Profile() {
  const userId = useUserId();
  const { currentUserId } = useMapState(mapState);

  if (userId === null) {
    return (
      <RequireLogin>
        {currentUserId !== null && (
          <Redirect to={`/profile/${currentUserId}`} />
        )}
      </RequireLogin>
    );
  }

  return (
    <React.Fragment>
      <Navigation />
    </React.Fragment>
  );
}

export default Profile;
