import {
  ContainerHeader,
  HeaderSection,
} from '@atlaskit/navigation-next';
import React from 'react';
import { matchPath } from 'react-router-dom';

import { useMakeMapState } from '../../../../store/use-store';
import { useLocation } from '../../../../utils/use-router';
import { State } from '../../../../store';
import { getCurrentUserId } from '../../../../store/user-id/selectors';
import { makeGetUserName } from '../../../../store/users/selectors';

import Avatar from './Avatar';

const makeMapState = () => {
  const getUserName = makeGetUserName();

  return (state: State, userId: string | null) => {
    return {
      currentUserId: getCurrentUserId(state),
      name: getUserName(state, userId),
    };
  };
};

function getText(userId: string | null, currentUserId: string | null, name: string | null) {
  if (userId === null || name === null) {
    return 'Loading...';
  } else if (currentUserId === userId) {
    return 'Your Profile';
  }

  return `${name}'s Profile`;
}

function Header() {
  const { pathname } = useLocation();
  const match = matchPath(pathname, { path: '/profile/:userId' });
  const userId = match ? match.params.userId : null;
  const {
    currentUserId,
    name,
  } = useMakeMapState(makeMapState, userId);

  return (
    <HeaderSection>
      {({ className }) => (
        <div className={className}>
          <ContainerHeader
            text={getText(userId, currentUserId, name)}
            before={Avatar}
          />
        </div>
      )}
    </HeaderSection>
  );
}

export default Header;
