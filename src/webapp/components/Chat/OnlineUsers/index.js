// @flow

import React from 'react';
import injectSheet from 'react-jss';

import UserItem from '../../UserItem';
import { type User } from '../../../../types/User';

type OwnProps = {
  onlineUsers: $ReadOnlyArray<User>,
  classes: { container: string },
};

const styles = {
  container: {
    flex: 1,
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
};

class OnlineUsers extends React.PureComponent<OwnProps> {
  renderUsers() {
    return this.props.onlineUsers.map(user => (
      <li key={user.id}>
        <UserItem userId={user.id} />
      </li>
    ));
  }

  render() {
    return (
      <ul className={this.props.classes.container}>
        {this.renderUsers()}
      </ul>
    );
  }
}

export default injectSheet(styles)(OnlineUsers);
