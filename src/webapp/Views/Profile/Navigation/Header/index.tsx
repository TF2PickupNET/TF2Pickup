import React from 'react';

import { useMakeMapState } from '../../../../store/use-store';
import { State } from '../../../../store';
import { makeGetUserStatusById } from '../../../../store/users/selectors';
import { useUserId } from '../../utils';
import UserItem from '../../../../components/UserItem';
import { AsyncStatus } from '../../../../store/types';
import { makeGetProfileStatusById } from '../../../../store/user-profiles/selectors';
import Header from '../../../../components/PageNavigation/Header';

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

function ProfileHeader() {
  const userId = useUserId();
  const {
    hasLoadedUser,
    hasLoadedProfile,
  } = useMakeMapState(makeMapState, userId);
  const text = userId === null || !(hasLoadedUser && hasLoadedProfile)
    ? 'Loading...'
    : <UserItem userId={userId} />;

  return (
    <Header
      text={text}
      before={Avatar}
    />
  );
}

export default ProfileHeader;
