// @flow

import React from 'react';
import {
  Tag,
  Icon,
  Select,
  message,
} from 'antd';
import injectSheet from 'react-jss';
import {
  connect,
  type MapStateToProps,
} from 'react-redux';
import { createSelector } from 'reselect';

import { roles } from '../../../../config';
import hasPermission from '../../../../utils/has-permission';
import { type State } from '../../../store';
import { getCurrentUser } from '../../../store/user-id/selectors';
import { makeGetUserById } from '../../../store/users/selectors';
import app from '../../../app';

type ConnectedProps = {|
  roles: $ReadOnlyArray<$Keys<typeof roles>>,
  canEditRoles: boolean,
|};
type OwnProps = {
  userId: string,
  classes: {
    rolesContainer: string,
    addRoleTag: string,
    rolesSelect: string,
  },
};
type LocalState = { isSelectVisible: boolean };

const { Option } = Select;
const styles = {
  rolesContainer: {
    height: '32px',
    padding: '4px 0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  rolesSelect: { width: 120 },

  addRoleTag: {
    background: '#fff',
    borderStyle: 'dashed',
  },
};

class Roles extends React.PureComponent<OwnProps & ConnectedProps, LocalState> {
  state = { isSelectVisible: false };

  handleAddRoleClick = () => {
    this.setState({ isSelectVisible: true });
  };

  handleSelectBlur = () => {
    this.setState({ isSelectVisible: false });
  };

  handleRolesChange = (value) => {
    app.io.emit('users:add-role', {
      role: value,
      userId: this.props.userId,
    }, (err) => {
      this.setState({ isSelectVisible: false });

      if (err) {
        message.error(err.message);
      }
    });
  };

  handleRemoveRole = role => () => {
    app.io.emit('users:remove-role', {
      role,
      userId: this.props.userId,
    }, (err) => {
      if (err) {
        message.error(err.message);
      }
    });
  };

  renderRoleTags() {
    return this.props.roles.map(role => (
      <Tag
        key={role}
        color={roles[role].color}
        closable={this.props.canEditRoles}
        afterClose={this.handleRemoveRole(role)}
      >
        {roles[role].display}
      </Tag>
    ));
  }

  renderRoleSelect(rolesToAdd) {
    return (
      <Select
        autoFocus
        size="small"
        className={this.props.classes.rolesSelect}
        onChange={this.handleRolesChange}
        onBlur={this.handleSelectBlur}
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

  renderAddRole() {
    if (!this.props.canEditRoles) {
      return null;
    }

    const rolesToAdd = Object
      .keys(roles)
      .filter(role => !this.props.roles.includes(role));

    if (rolesToAdd.length === 0) {
      return null;
    }

    return this.state.isSelectVisible ? this.renderRoleSelect(rolesToAdd) : (
      <Tag
        className={this.props.classes.addRoleTag}
        onClick={this.handleAddRoleClick}
      >
        <Icon type="plus" /> Add Role
      </Tag>
    );
  }

  render() {
    return (
      <div className={this.props.classes.rolesContainer}>
        <Tag>
          User
        </Tag>

        {this.renderRoleTags()}

        {this.renderAddRole()}
      </div>
    );
  }
}

const makeMapStateToProps = (): MapStateToProps<State, OwnProps, ConnectedProps> => {
  const getSortedRoles = createSelector(
    user => (user === null ? [] : user.roles),
    // TODO: REFACTOR THIS
    // eslint-disable-next-line fp/no-mutating-methods
    userRoles => [...userRoles].sort((role1, role2) => roles[role1].level - roles[role2].level),
  );
  const getUser = makeGetUserById();

  return (state, props) => {
    const user = getUser(state, props.userId);

    return {
      canEditRoles: hasPermission('user.change-role', getCurrentUser(state), user),
      roles: getSortedRoles(user),
    };
  };
};

export default injectSheet(styles)(
  connect(makeMapStateToProps)(Roles),
);
