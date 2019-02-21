import React from 'react';
import Avatar from '@atlaskit/avatar';
import {
  State,
  useMapState,
} from '@webapp/store';
import { makeGetAvatar } from '@webapp/store/user-profiles/selectors';
import { getCurrentUserId } from '@webapp/store/user-id/selectors';

const makeMapState = () => {
  const getAvatar = makeGetAvatar('medium');

  return (state: State) => {
    return { url: getAvatar(state, getCurrentUserId(state)) };
  };
};

function UserAvatar() {
  const { url } = useMapState(makeMapState());

  return (
    <Avatar
      isHover={false}
      isActive={false}
      borderColor="transparent"
      src={url}
      size="small"
    />
  );
}

export default UserAvatar;
