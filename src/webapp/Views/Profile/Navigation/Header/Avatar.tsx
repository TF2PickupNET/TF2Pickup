import React from 'react';
import {
  ItemAvatar,
  ItemBeforeAfterProps,
} from '@atlaskit/navigation-next';

import { useMakeMapState } from '../../../../store/use-store';
import { makeGetAvatar } from '../../../../store/user-profiles/selectors';
import { makeGetUserIsOnline } from '../../../../store/users/selectors';
import { State } from '../../../../store';
import { useUserId } from '../../utils';

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
  const userId = useUserId();
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
