import React from 'react';
import { ItemAvatar } from '@atlaskit/navigation-next';
import { matchPath } from 'react-router-dom';

import { useMakeMapState } from '../../../../store/use-store';
import { makeGetAvatar } from '../../../../store/user-profiles/selectors';
import { makeGetUserIsOnline } from '../../../../store/users/selectors';
import { State } from '../../../../store';
import { useLocation } from '../../../../utils/use-router';

const makeMapState = () => {
  const getAvatar = makeGetAvatar('large');
  const getUserIsOnline = makeGetUserIsOnline();

  return (state: State, userId: string | null) => {
    return {
      avatar: getAvatar(state, userId),
      isOnline: getUserIsOnline(state, userId),
    };
  };
};

function Avatar(props) {
  const { pathname } = useLocation();
  const match = matchPath(pathname, { path: '/profile/:userId' });
  const userId = match ? match.params.userId : null;
  const {
    avatar,
    isOnline,
  } = useMakeMapState(makeMapState, userId);

  return (
    <ItemAvatar
      itemState={props}
      size="large"
      presence={isOnline ? 'online' : 'offline'}
      src={avatar}
    />
  );
}

export default Avatar;
