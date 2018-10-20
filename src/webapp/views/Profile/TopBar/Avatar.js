// @flow

import React from 'react';
import { Avatar } from 'antd';
import injectSheet from 'react-jss';
import {
  connect,
  type MapStateToProps,
} from 'react-redux';
import { createSelector } from 'reselect';

import { makeGetProfileById } from '../../../store/user-profiles/selectors';
import { type State } from '../../../store';

type ConnectedProps = {| avatar: string |};
type OwnProps = { classes: { avatar: string } };

const styles = {
  avatar: {
    height: 160,
    width: 160,
  },
};

function UserAvatar(props: OwnProps & ConnectedProps) {
  return (
    <Avatar
      shape="square"
      className={props.classes.avatar}
      src={props.avatar}
    />
  );
}

const makeMapStateToProps = (): MapStateToProps<State, { userId: string }, ConnectedProps> => {
  const getAvatar = createSelector(
    makeGetProfileById(),
    profile => (profile === null ? '' : profile.steam.avatar.large),
  );

  return (state, props) => {
    return { avatar: getAvatar(state, props.userId) };
  };
};

export default injectSheet(styles)(
  connect(makeMapStateToProps)(UserAvatar)
);
