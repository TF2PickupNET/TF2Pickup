// @flow

import React from 'react';
import { List } from 'antd';

import { makeGetUserById } from '../../../store/users/selectors';
import { hasSomePermission } from '../../../../utils/has-permission';
import { getCurrentUser } from '../../../store/user-id/selectors';
import { useMakeMapState } from '../../../store/use-store';
import { useMatch } from '../../../utils/use-router';
import { isString } from '../../../../utils/string';

import AddWarningItem from './AddWarningItem';

const makeMapState = () => {
  const getUserById = makeGetUserById();

  return (state, userId) => {
    return {
      hasAPermission: hasSomePermission(
        ['warnings.create'],
        getCurrentUser(state),
        getUserById(state, isString(userId) ? userId : null),
      ),
    };
  };
};

const renderItem = item => item;

function AdminActions() {
  const userId = useMatch(match => match.params.userId);
  const { hasAPermission } = useMakeMapState(makeMapState, userId);

  if (!hasAPermission) {
    return null;
  }

  const items = [
    <AddWarningItem key="add-warning" />,
  ];

  return (
    <List
      bordered
      header="Actions"
      style={{
        backgroundColor: '#ffffff',
        width: 160,
        marginTop: 16,
      }}
      dataSource={items}
      renderItem={renderItem}
    />
  );
}

export default AdminActions;
