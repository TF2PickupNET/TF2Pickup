// @flow

import React from 'react';
import injectSheet from 'react-jss';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

import { makeGetUserName } from '../../../store/users/selectors';
import { getCurrentUserId } from '../../../store/user-id/selectors';
import { useMakeMapState } from '../../../utils/use-store';
import Avatar from '../../../components/Avatar';

type Props = {
  classes: {
    menu: string,
    menuItem: string,
    avatar: string,
  },
};

const styles = {
  menu: {
    padding: 0,
    lineHeight: '64px',
    height: 64,
    display: 'inline',
  },

  menuItem: {
    padding: '0 32px',
    fontSize: '1.5em',
  },

  avatar: { marginLeft: 16 },
};

const makeMapState = () => {
  const getName = makeGetUserName();

  return (state) => {
    const userId = getCurrentUserId(state);

    return {
      userId,
      name: getName(state, userId),
    };
  };
};

function RightMenu(props: Props) {
  const {
    name,
    userId,
  } = useMakeMapState(makeMapState);

  if (userId === null || name === null) {
    return null;
  }

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectable={false}
      className={props.classes.menu}
    >
      <Menu.Item className={props.classes.menuItem}>
        <Link to="/profile">
          {name}

          <Avatar
            id={userId}
            className={props.classes.avatar}
            size={48}
            avatarSize="medium"
          />
        </Link>
      </Menu.Item>
    </Menu>
  );
}

export default injectSheet(styles)(RightMenu);
