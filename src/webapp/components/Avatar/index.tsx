import React from 'react';
import AvatarImg, { AvatarProps } from '@atlaskit/avatar';

import { makeGetAvatar } from '@webapp/store/user-profiles/selectors';
import {
  State,
  useMakeMapState,
} from '@webapp/store';

interface Props extends AvatarProps {
  id: string | null,
  className: string,
}

const makeMapState = () => {
  const getAvatar = makeGetAvatar('large');

  return (state: State, id: string | null) => {
    return { avatar: getAvatar(state, id) };
  };
};

function Avatar(props: Props) {
  const {
    id,
    ...other
  } = props;

  const { avatar } = useMakeMapState(makeMapState, id);

  return (
    <AvatarImg
      src={avatar}
      {...other}
    />
  );
}

export default Avatar;
