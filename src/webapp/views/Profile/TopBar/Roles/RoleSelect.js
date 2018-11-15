// @flow

import React from 'react';
import { Select } from 'antd';
import injectSheet from 'react-jss';

import { roles } from '../../../../../config';

type Props = {
  onChange: (role: $Keys<typeof roles>) => void,
  onBlur: () => void,
  roles: $ReadOnlyArray<$Keys<typeof roles>>,
  classes: { rolesSelect: string },
};

const { Option } = Select;
const styles = { rolesSelect: { width: 120 } };

function RoleSelect(props: Props) {
  return (
    <Select
      autoFocus
      size="small"
      className={props.classes.rolesSelect}
      // $FlowFixMe
      onChange={props.onChange}
      onBlur={props.onBlur}
    >
      {props.roles.map(role => (
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

export default injectSheet(styles)(RoleSelect);
