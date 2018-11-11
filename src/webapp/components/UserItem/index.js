// @flow

import React, { useEffect } from 'react';
import { Icon } from 'antd';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';

import {
  makeGetHighestRole,
  makeGetUserName,
} from '../../store/users/selectors';
import { makeIsFriend } from '../../store/user-profiles/selectors';
import { fetchUser } from '../../store/users/actions';
import { roles } from '../../../config';
import { useMakeMapState } from '../../utils/use-store';
import useActions from '../../utils/use-actions';

type Props = {
  userId: string,
  className: string,
  classes: {
    container: string,
    friendIcon: string,
  },
};

const styles = {
  container: {
    lineHeight: '24px',
    color: props => props.color,
  },

  friendIcon: { marginRight: '4px' },
};
const makeMapState = () => {
  const getName = makeGetUserName();
  const isFriend = makeIsFriend();
  const getHighestRole = makeGetHighestRole();

  return (state, props) => {
    const role = getHighestRole(state, props.userId);

    return {
      name: getName(state, props.userId),
      color: role === null ? null : roles[role].color,
      isFriend: isFriend(state, props.userId),
    };
  };
};

function UserItem(props: Props) {
  const {
    name,
    color,
    isFriend,
  } = useMakeMapState(makeMapState, props);
  const actions = useActions({ fetchUser });

  useEffect(() => {
    actions.fetchUser(props.userId);
  }, [props.userId]);

  if (name === null) {
    return null;
  }

  return (
    <Link
      to={`/profile/${props.userId}`}
      className={`${props.classes.container} ${props.className}`}
    >
      {isFriend && (
        <Icon
          type="user"
          className={props.classes.friendIcon}
        />
      )}

      {name}
    </Link>
  );
}

UserItem.defaultProps = { className: '' };

export default injectSheet(styles)(UserItem);
