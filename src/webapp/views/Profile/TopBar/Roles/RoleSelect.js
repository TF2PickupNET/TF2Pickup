// @flow

import React, {
  useCallback,
  useState,
} from 'react';
import {
  Icon,
  message,
  Select,
  Tag,
} from 'antd';
import injectSheet from 'react-jss';

import { roles } from '../../../../../config';
import app from '../../../../app';

type Props = {
  userId: string,
  canEditRoles: boolean,
  userRoles: $ReadOnlyArray<$Keys<typeof roles>>,
  classes: {
    addRoleTag: string,
    rolesSelect: string,
  },
};

const { Option } = Select;
const styles = {
  rolesSelect: { width: 120 },

  addRoleTag: {
    background: '#fff',
    borderStyle: 'dashed',
  },
};

function addRole(role, userId) {
  app.io.emit('users:add-role', {
    role,
    userId,
  }, (err) => {
    if (err) {
      message.error(`Couldn't add role to user because: ${err.message}`);
    }
  });
}

function RoleSelect(props: Props) {
  const [isSelectVisible, setIsSelectVisible] = useState(false);
  const handleSelectClick = useCallback(() => {
    setIsSelectVisible(true);
  }, []);
  const handleSelectBlur = useCallback(() => {
    setIsSelectVisible(false);
  }, []);
  const handleRoleChange = useCallback((role: string) => {
    addRole(role, props.userId);
    setIsSelectVisible(false);
  }, [props.userId]);
  const rolesToAdd = Object
    .keys(roles)
    .filter(role => !props.userRoles.includes(role));

  if (rolesToAdd.length === 0 || !props.canEditRoles) {
    return null;
  }

  if (isSelectVisible) {
    return (
      <Select
        autoFocus
        size="small"
        className={props.classes.rolesSelect}
        onChange={handleRoleChange}
        onBlur={handleSelectBlur}
      >
        {rolesToAdd.map(role => (
          <Option
            key={role}
            value={role}
          >
            {roles[role].display}
          </Option>
        ))}
      </Select>
    );
  }

  return (
    <Tag
      className={props.classes.addRoleTag}
      onClick={handleSelectClick}
    >
      <Icon type="plus" /> Add Role
    </Tag>
  );
}

export default injectSheet(styles)(RoleSelect);
