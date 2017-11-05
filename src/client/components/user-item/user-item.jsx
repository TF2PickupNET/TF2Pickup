import React from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import mapValues from 'lodash.mapvalues';
import { Icon } from 'materialize-react';

import { computeLevel } from '../../../utils/has-permission';
import roles from '../../../config/roles';

/**
 * Render a users name and some optional icons.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX for the user item.
 */
function UserItem(props) {
  const isFriend = props.loggedInUser
    ? props.loggedInUser.friends.includes(props.user.id)
    : false;
  const level = computeLevel(props.user.roles);
  const roleInfo = Object
    .values(roles)
    .find(role => role.level === level);
  const isDonator = props.user.roles.includes('donator');

  return (
    <span className={`${props.classes.item} ${roleInfo ? props.classes[roleInfo.name] : ''}`}>
      {isDonator && (
        <Icon
          icon="star"
          className={`${props.classes.icon} ${props.classes.donator}`}
        />
      )}

      {isFriend && (
        <Icon
          icon="account"
          className={`${props.classes.icon} ${props.classes.friendIcon}`}
        />
      )}

      {props.user.name}
    </span>
  );
}

UserItem.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  classes: PropTypes.shape({
    item: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    donator: PropTypes.string.isRequired,
    friendIcon: PropTypes.string.isRequired,
  }).isRequired,
  loggedInUser: PropTypes.shape({ friends: PropTypes.arrayOf(PropTypes.string) }),
};

UserItem.defaultProps = { loggedInUser: null };

UserItem.styles = (theme) => {
  return {
    item: {
      height: 24,
      lineHeight: '24px',
      color: theme.textColor,
      display: 'flex',
      alignItems: 'center',
    },

    icon: {
      marginRight: 2,

      '&:before': {
        fontSize: '20px !important',
        lineHeight: '24px',
      },
    },

    friendIcon: { color: 'inherit' },

    ...mapValues(roles, (role) => {
      return { color: role.color[theme.type] };
    }),
  };
};

export default connect(
  (state) => {
    return { loggedInUser: state.user };
  },
)(injectSheet(UserItem.styles)(UserItem));

