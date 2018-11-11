// @flow

import React from 'react';
import { Avatar as AvatarC } from 'antd';

import { makeGetAvatar } from '../../store/user-profiles/selectors';
import { useMakeMapState } from '../../utils/use-store';

type Props = {
  // eslint-disable-next-line react/no-unused-prop-types
  id: string,
  className: string,
  size: number,
  // eslint-disable-next-line react/no-unused-prop-types
  avatarSize: 'small' | 'medium' | 'large',
  shape: 'circle' | 'square',
};

const makeMapState = () => {
  const getAvatar = makeGetAvatar();

  return (state, props) => {
    return { avatar: getAvatar(state, props.id, props.avatarSize) };
  };
};

function Avatar(props: Props) {
  const { avatar } = useMakeMapState(makeMapState, props);

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
