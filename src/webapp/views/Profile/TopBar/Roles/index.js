// @flow

import React from 'react';
import { Tag } from 'antd';
import injectSheet from 'react-jss';

import { hasPermission } from '../../../../../utils/has-permission';
import { getCurrentUser } from '../../../../store/user-id/selectors';
import {
  makeGetSortedRoles,
  makeGetUserById,
} from '../../../../store/users/selectors';
import { useMakeMapState } from '../../../../utils/use-store';

import Role from './Role';
import AddRoleTag from './AddRoleTag';

type Props = {
  userId: string,
  classes: { rolesContainer: string },
};

const styles = {
  rolesContainer: {
    height: '32px',
    padding: '4px 0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
};

const makeMapState = () => {
  const getUser = makeGetUserById();
  const getRoles = makeGetSortedRoles();

  return (state, props) => {
    const userRoles = getRoles(state, props.userId);

    return {
      canEditRoles: hasPermission(
        'user.change-role',
        getCurrentUser(state),
        getUser(state, props.userId),
      ),
      userRoles,
    };
  };
};

function Roles(props: Props) {
  const {
    canEditRoles,
    userRoles,
  } = useMakeMapState(makeMapState, props);

  return (
    <div className={props.classes.rolesContainer}>
      <Tag>
        User
      </Tag>

      {userRoles.map(role => (
        <Role
          key={role}
          role={role}
          userId={props.userId}
          canEditRoles={canEditRoles}
        />
      ))}

      <AddRoleTag
        userId={props.userId}
        userRoles={userRoles}
        canEditRoles={canEditRoles}
      />
    </div>
  );
}

export default injectSheet(styles)(Roles);
