// @flow

import React from 'react';

import Avatar from '../../../components/Avatar';
import { useMatch } from '../../../utils/use-router';
import { isString } from '../../../../utils/string';

function UserAvatar() {
  const userId = useMatch(match => match.params.userId);

  return (
    <Avatar
      avatarSize="large"
      shape="square"
      size={160}
      id={isString(userId) ? userId : null}
    />
  );
}

export default UserAvatar;
