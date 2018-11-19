// @flow

import React, {
  useCallback,
  useState,
} from 'react';
import {
  Icon,
  Tag,
} from 'antd';
import injectSheet from 'react-jss';

import { roles } from '../../../../../config';
import { addRole } from '../../../../store/users/actions';

import RoleSelect from './RoleSelect';

type Props = {
  userId: string,
  canEditRoles: boolean,
  userRoles: $ReadOnlyArray<$Keys<typeof roles>>,
  classes: { addRoleTag: string },
};
const styles = {
  addRoleTag: {
    background: '#fff',
    borderStyle: 'dashed',
  },
};

const getRolesToAdd = userRoles => Object
  .keys(roles)
  .filter(role => !userRoles.includes(role));

function AddRoleTag(props: Props) {
  const [isSelectVisible, setIsSelectVisible] = useState(false);
  const handleSelectClick = useCallback(() => setIsSelectVisible(true), []);
  const handleSelectBlur = useCallback(() => setIsSelectVisible(false), []);
  const handleSelectChange = useCallback((role: $Keys<typeof roles>) => {
    addRole(props.userId, role);
    setIsSelectVisible(false);
  }, [props.userId]);
  const rolesToAdd = getRolesToAdd(props.userRoles);

  if (rolesToAdd.length === 0 || !props.canEditRoles) {
    return null;
  }

  if (isSelectVisible) {
    return (
      <RoleSelect
        roles={rolesToAdd}
        onChange={handleSelectChange}
        onBlur={handleSelectBlur}
      />
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

export default injectSheet(styles)(AddRoleTag);
