import React, { useContext } from 'react';
import {
  ItemAvatar,
  ItemBeforeAfterProps,
} from '@atlaskit/navigation-next';
import {
  useMakeMapState,
  State,
} from '@webapp/store';
import { makeGetAvatar } from '@webapp/store/user-profiles/selectors';
import { makeGetUserIsOnline } from '@webapp/store/users/selectors';
import { UserIdContext } from '@webapp/Views/Profile';

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

function Avatar(props: ItemBeforeAfterProps) {
  const userId = useContext(UserIdContext);
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
