// @flow

import React, { useEffect } from 'react';
import Helmet from 'react-helmet';

import { fetchUser } from '../../store/users/actions';
import { fetchProfile } from '../../store/user-profiles/actions';
import {
  makeGetUserById,
  makeGetUserName,
} from '../../store/users/selectors';
import { makeIsCurrentUser } from '../../store/user-id/selectors';
import { makeGetProfileById } from '../../store/user-profiles/selectors';
import useActions from '../../utils/use-actions';
import { useMakeMapState } from '../../utils/use-store';

import TopBar from './TopBar';
import Links from './Links';
import LoadingScreen from './LoadingScreen';
import AdminActions from './AdminActions';

type Props = { match: { params: { userId: string } } };

const makeMapState = () => {
  const getUserById = makeGetUserById();
  const getProfileById = makeGetProfileById();
  const isCurrentUser = makeIsCurrentUser();
  const getUserName = makeGetUserName();

  return (state, userId) => {
    return {
      hasLoadedUser: getUserById(state, userId) !== null,
      hasLoadedProfile: getProfileById(state, userId) !== null,
      isCurrentUser: isCurrentUser(state, userId),
      name: getUserName(state, userId),
    };
  };
};

function useLoadProfile(userId) {
  const actions = useActions({
    fetchUser,
    fetchProfile,
  });
  const {
    hasLoadedUser,
    hasLoadedProfile,
  } = useMakeMapState(makeMapState, userId);

  useEffect(() => {
    if (!hasLoadedUser) {
      actions.fetchUser(userId);
    }
  }, [hasLoadedUser]);

  useEffect(() => {
    if (!hasLoadedProfile) {
      actions.fetchProfile(userId);
    }
  }, [hasLoadedProfile]);

  return {
    hasLoadedProfile,
    hasLoadedUser,
  };
}

function Profile(props: Props) {
  const userId = props.match.params.userId;
  const {
    isCurrentUser,
    name,
  } = useMakeMapState(makeMapState, userId);
  const {
    hasLoadedUser,
    hasLoadedProfile,
  } = useLoadProfile(userId);

  if (!hasLoadedUser || !hasLoadedProfile) {
    return (<LoadingScreen />);
  }

  const title = isCurrentUser
    ? 'Your Profile'
    : `Profile of ${name === null ? 'Unknown' : name}`;

  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <TopBar />

      <div style={{ marginTop: 16 }}>
        <Links />

        <AdminActions />
      </div>
    </React.Fragment>
  );
}

export default Profile;
