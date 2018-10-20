// @flow

import React from 'react';

import UserItem from '../../UserItem';

type OwnProps = {
  onlineUsers: $ReadOnlyArray<string>,
};

const styles = {
};

export default class OnlineUsers extends React.PureComponent<OwnProps> {
  renderUsers() {
    return this.props.onlineUsers.map(userId => (
      <li key={userId}>
        <UserItem userId={userId} />
      </li>
    ));
  }

  render() {
    return (
      <ul>
        {this.renderUsers()}
      </ul>
    );
  }
}
