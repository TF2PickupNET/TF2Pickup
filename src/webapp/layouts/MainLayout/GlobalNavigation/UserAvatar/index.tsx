import React from 'react';
import Avatar from '@atlaskit/avatar';

import { State } from '../../../../store';
import { makeGetAvatar } from '../../../../store/user-profiles/selectors';
import { getCurrentUserId } from '../../../../store/user-id/selectors';
import { useMapState } from '../../../../store/use-store';

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
    />
  );
}

export default UserAvatar;
