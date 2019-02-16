import React, { useEffect } from 'react';

import { fetchUser } from '../../store/users/actions';
import { fetchProfile } from '../../store/user-profiles/actions';

import Navigation from './Navigation';

interface Props {
  userId: string,
  path: string,
}

export const UserIdContext = React.createContext('');

function Profile(props: Props) {
  useEffect(() => {
    fetchUser(props.userId);
    fetchProfile(props.userId);
  }, [props.userId]);

  return (
    <UserIdContext.Provider value={props.userId}>
      <Navigation />
    </UserIdContext.Provider>
  );
}

export default Profile;
