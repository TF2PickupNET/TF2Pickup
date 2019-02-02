import React, { useEffect } from 'react';
import withStyles, { WithStyles } from 'react-jss';
import PersonIcon from '@atlaskit/icon/glyph/person';
import { Link } from 'react-router-dom';

import { makeGetUserName } from 'webapp/store/users/selectors';
import { fetchUser } from 'webapp/store/users/actions';
import {
  State,
  useMakeMapState,
  useActions,
} from 'webapp/store';
import { makeIsFriend } from 'webapp/store/user-profiles/selectors';

const styles = {
  container: { lineHeight: '24px' },

  friendIcon: { marginRight: '4px' },
};

const makeMapState = () => {
  const getName = makeGetUserName();
  const isFriend = makeIsFriend();

  return (state: State, userId: string) => {
    return {
      name: getName(state, userId),
      isFriend: isFriend(state, userId),
    };
  };
};

interface Props extends WithStyles<typeof styles> {
  userId: string,
  className?: string,
}

function UserItem(props: Props) {
  const {
    name,
    isFriend,
  } = useMakeMapState(makeMapState, props.userId);
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
        <span className={props.classes.friendIcon}>
          <PersonIcon label="friend" />
        </span>
      )}

      {name}
    </Link>
  );
}

UserItem.defaultProps = { className: '' };

export default withStyles(styles)(UserItem);
