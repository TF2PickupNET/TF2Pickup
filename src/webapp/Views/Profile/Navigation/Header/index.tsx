import React, { useContext } from 'react';
import {
  State,
  useMakeMapState,
  AsyncStatus,
} from '@webapp/store';
import { makeGetUserStatusById } from '@webapp/store/users/selectors';
import UserItem from '@webapp/components/UserItem';
import { makeGetProfileStatusById } from '@webapp/store/user-profiles/selectors';
import { Header as HeaderItem } from '@webapp/components/PageNavigation';
import { UserIdContext } from '@webapp/Views/Profile';

import Avatar from './Avatar';

const makeMapState = () => {
  const getUserStatusById = makeGetUserStatusById();
  const getProfileStatusById = makeGetProfileStatusById();

  return (state: State, userId: string | null) => {
    return {
      hasLoadedUser: getUserStatusById(state, userId) === AsyncStatus.FETCHED,
      hasLoadedProfile: getProfileStatusById(state, userId) === AsyncStatus.FETCHED,
    };
  };
};

function Header() {
  const userId = useContext(UserIdContext);
  const {
    hasLoadedUser,
    hasLoadedProfile,
  } = useMakeMapState(makeMapState, userId);
  const text = userId === null || !(hasLoadedUser && hasLoadedProfile)
    ? 'Loading...'
    : <UserItem userId={userId} />;

  return (
    <HeaderItem
      text={text}
      before={Avatar}
    />
  );
}

export default Header;
