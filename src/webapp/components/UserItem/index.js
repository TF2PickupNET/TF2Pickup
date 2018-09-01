// @flow

import React from 'react';
import { Icon } from 'antd';
import injectSheet from 'react-jss';
import {
  connect,
  type MapStateToProps,
} from 'react-redux';
import { Link } from 'react-router-dom';
import { createSelector } from 'reselect';

import { type State } from '../../store';
import { makeGetUserName } from '../../store/users/selectors';
import { getCurrentUserId } from '../../store/user-id/selectors';
import { makeGetProfileById } from '../../store/user-profiles/selectors';
import { fetchUser } from '../../store/users/actions';

type Props = {
  name: string | null,
  isFriend: boolean,
  userId: string,
  color: string | null,
  className: string,
  fetchUser: (userId: string) => void,
  classes: {
    container: string,
    friendIcon: string,
  },
};

const styles = {
  container: { lineHeight: '24px' },

  friendIcon: { marginRight: '4px' },
};

class UserItem extends React.PureComponent<Props> {
  static defaultProps = { className: '' };

  componentDidMount() {
    if (this.props.name === null) {
      this.props.fetchUser(this.props.userId);
    }
  }

  render() {
    if (this.props.name === null) {
      return null;
    }

    return (
      <Link
        to={`/profile/${this.props.userId}`}
        className={`${this.props.classes.container} ${this.props.className}`}
      >
        {this.props.isFriend && (
          <Icon
            type="user"
            className={this.props.classes.friendIcon}
          />
        )}

        {this.props.name}
      </Link>
    );
  }
}

const makeMapStateToProps = (): MapStateToProps<State, Props> => {
  const getFriends = createSelector(
    makeGetProfileById(),
    profile => (profile === null ? [] : profile.steam.friends),
  );
  const getName = makeGetUserName();
  const isFriend = (friends, userId) => friends.includes(userId);

  return (state, props) => {
    const friends = getFriends(state, getCurrentUserId(state));

    return {
      name: getName(state, props.userId),
      isFriend: isFriend(friends, props.userId),
    };
  };
};
const mapDispatchToProps = (dispatch) => {
  return { fetchUser: userId => dispatch(fetchUser(userId)) };
};

export default injectSheet(styles)(
  connect(makeMapStateToProps, mapDispatchToProps)(UserItem),
);
