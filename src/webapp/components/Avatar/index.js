// @flow

import React from 'react';
import { Avatar as AvatarC } from 'antd';

import { makeGetAvatar } from '../../store/user-profiles/selectors';
import { useMakeMapState } from '../../utils/use-store';

type Props = {
  id: string | null,
  className: string,
  size: number,
  avatarSize: 'small' | 'medium' | 'large',
  shape: 'circle' | 'square',
};

const makeMapState = () => {
  const getAvatar = makeGetAvatar();

  return (state, id, avatarSize) => {
    return { avatar: getAvatar(state, id, avatarSize) };
  };
};

function Avatar(props: Props) {
  const { avatar } = useMakeMapState(makeMapState, props.id, props.avatarSize);

  return (
    <AvatarC
      size={props.size}
      shape={props.shape}
      src={avatar === null ? '' : avatar}
      className={props.className}
    />
  );
}

Avatar.defaultProps = {
  shape: 'circle',
  className: '',
};

export default Avatar;
