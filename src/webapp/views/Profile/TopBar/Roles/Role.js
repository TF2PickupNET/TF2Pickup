// @flow

import React, { useCallback } from 'react';
import { Tag } from 'antd';

import { roles } from '../../../../../config';
import { removeRole } from '../../../../store/users/actions';

type Props = {
  role: $Keys<typeof roles>,
  userId: string,
  canEditRoles: boolean,
};

export default function Role(props: Props) {
  const handleRoleRemove = useCallback(() => {
    removeRole(props.userId, props.role);
  }, [props.userId, props.role]);

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
