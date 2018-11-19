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
import { useMatch } from '../../../../utils/use-router';

import Role from './Role';
import AddRoleTag from './AddRoleTag';

type Props = { classes: { rolesContainer: string } };

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

  return (state, userId) => {
    const userRoles = getRoles(state, userId);

    return {
      canEditRoles: hasPermission(
        'user.change-role',
        getCurrentUser(state),
        getUser(state, userId),
      ),
      userRoles,
    };
  };
};

function Roles(props: Props) {
  const userId = useMatch(match => match.params.userId, null);
  const {
    canEditRoles,
    userRoles,
  } = useMakeMapState(makeMapState, userId);

  return (
    <div className={props.classes.rolesContainer}>
      <Tag>
        User
      </Tag>

      {userId !== null && userRoles.map(role => (
        <Role
          key={role}
          role={role}
          userId={userId}
          canEditRoles={canEditRoles}
        />
      ))}

      <AddRoleTag
        userId={userId}
        userRoles={userRoles}
        canEditRoles={canEditRoles}
      />
    </div>
  );
}

export default injectSheet(styles)(Roles);
