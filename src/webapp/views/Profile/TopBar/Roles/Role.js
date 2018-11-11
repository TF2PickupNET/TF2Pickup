// @flow

import React, { useCallback } from 'react';
import {
  message,
  Tag,
} from 'antd';

import { roles } from '../../../../../config';
import app from '../../../../app';

type Props = {
  role: $Keys<typeof roles>,
  userId: string,
  canEditRoles: boolean,
};

export default function Role(props: Props) {
  const handleRoleRemove = useCallback(() => {
    app.io.emit('users:remove-role', {
      role: props.role,
      userId: props.userId,
    }, (err) => {
      if (err) {
        message.error(`Couldn't remove role from user because: ${err.message}`);
      }
    });
  }, [props.role, props.userId]);

  return (
    <Tag
      color={roles[props.role].color}
      closable={props.canEditRoles}
      afterClose={handleRoleRemove}
    >
      {roles[props.role].display}
    </Tag>
  );
}
