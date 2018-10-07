// @flow

import React from 'react';
import { Icon } from 'antd';
import injectSheet from 'react-jss';
import {
  connect,
  type MapStateToProps,
} from 'react-redux';
import { Link } from 'react-router-dom';

import { type State } from '../../store';
import {
  makeGetHighestRole,
  makeGetUserName,
} from '../../store/users/selectors';
import { makeIsFriend } from '../../store/user-profiles/selectors';
import { fetchUser } from '../../store/users/actions';
import { roles } from '../../../config';

type Props = {
  name: string | null,
  isFriend: boolean,
  userId: string,
  // Color prop is being used inside the styles
  // eslint-disable-next-line react/no-unused-prop-types
  color: string | null,
  className: string,
  fetchUser: (userId: string) => void,
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
const mapDispatchToProps = (dispatch) => {
  return { fetchUser: userId => dispatch(fetchUser(userId)) };
};

export default injectSheet(styles)(
  connect(makeMapStateToProps, mapDispatchToProps)(UserItem),
);
