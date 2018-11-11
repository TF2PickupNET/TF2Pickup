// @flow

import React from 'react';

import Avatar from '../../../components/Avatar';

type Props = { userId: string };

function UserAvatar(props: Props) {
  return (
    <Avatar
      avatarSize="large"
      shape="square"
      size={160}
      id={props.userId}
    />
  );
}

export default UserAvatar;
