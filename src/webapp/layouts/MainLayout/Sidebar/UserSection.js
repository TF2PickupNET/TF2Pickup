// @flow

import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

import { useMakeMapState } from '../../../utils/use-store';
import { getCurrentUserId } from '../../../store/user-id/selectors';
import { makeGetLastPickup } from '../../../store/users/selectors';

const makeMapState = () => {
  const getLastPickupId = makeGetLastPickup();

  return (state) => {
    const userId = getCurrentUserId(state);

    return {
      userId,
      lastPickupId: getLastPickupId(state, userId),
    };
  };
};

export default function UserSection() {
  const {
    userId,
    lastPickupId,
  } = useMakeMapState(makeMapState);

  if (userId === null) {
    return null;
  }

  return [
    lastPickupId !== null && (
      <Menu.Item key={`/pickup/${lastPickupId}`}>
        <Link to={`/pickup/${lastPickupId}`}>
          Last Pickup
        </Link>
      </Menu.Item>
    ),

    <Menu.Item key="/settings">
      <Link to="/settings">
        Settings
      </Link>
    </Menu.Item>,

    <Menu.Item key={`/profile/${userId}`}>
      <Link to="/profile">
        Profile
      </Link>
    </Menu.Item>,

    <Menu.Item key="logout">
      Logout
    </Menu.Item>,
  ];
}
