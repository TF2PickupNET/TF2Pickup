import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';

import UserItem from '../../../components/user-item/index';

function OnlineUserItem(props) {
  return (
    <span className={props.classes.item}>
      <img
        alt="avatar"
        src={props.user.avatar}
        className={props.classes.avatar}
      />

      <UserItem
        user={props.user}
        className={props.classes.userItem}
      />
    </span>
  );
}

OnlineUserItem.styles = {
  avatar: {
    borderRadius: '50%',
    height: 32,
    width: 32,
  },

  item: {
    display: 'flex',
    alignItems: 'center',
    height: 40,
    padding: '4px 12px',
    boxSizing: 'border-box',
  },

  userItem: {
    flex: 1,
    padding: '0 8px',
  },
};

export default connect(
  (state, props) => {
    return { user: state.onlineUsers[props.id] };
  },
)(injectSheet(OnlineUserItem.styles)(OnlineUserItem));
