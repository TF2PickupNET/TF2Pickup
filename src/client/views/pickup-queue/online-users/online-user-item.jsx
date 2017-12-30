import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

import UserItem from '../../../components/user-item/index';

/**
 * The list item for a user in the online users list.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
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

OnlineUserItem.propTypes = {
  classes: PropTypes.shape({
    item: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    userItem: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({ avatar: PropTypes.string.isRequired }).isRequired,
};

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
