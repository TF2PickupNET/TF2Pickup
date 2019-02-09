import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { getCurrentUserId } from '../../store/user-id/selectors';
import { useMapState } from '../../store/use-store';
import { State } from '../../store';
import RequireLogin from '../../components/RequireLogin';
import { fetchUser } from '../../store/users/actions';
import { fetchProfile } from '../../store/user-profiles/actions';

import { useUserId } from './utils';
import Navigation from './Navigation';

const mapState = (state: State) => {
  return { currentUserId: getCurrentUserId(state) };
};

function Profile() {
  const userId = useUserId();
  const { currentUserId } = useMapState(mapState);

  useEffect(() => {
    if (userId !== null) {
      fetchUser(userId);
      fetchProfile(userId);
    }
  }, [userId]);

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
