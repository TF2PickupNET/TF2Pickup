import React from 'react';
import Aux from 'react-aux';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { Typography } from 'materialize-react';
import { connect } from 'react-redux';

import UserItem from '../../../components/user-item';
import { pipe } from '../../../../utils/functions';

/**
 * The user info for the toolbar.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
function UserInfo(props) {
  return (
    <Aux>
      {props.name && (
        <Typography typography="title">
          <UserItem
            user={{
              name: props.name,
              roles: props.roles,
              id: props.userId,
            }}
          />
        </Typography>
      )}

      <img
        className={props.classes.avatar}
        alt="avatar"
        src={props.avatar}
      />
    </Aux>
  );
}

UserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  userId: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  classes: PropTypes.shape({ avatar: PropTypes.string.isRequired }).isRequired,
};

UserInfo.styles = {
  avatar: {
    height: 48,
    width: 48,
    borderRadius: '50%',
    marginLeft: 16,
  },
};

export default pipe(
  connect((state) => {
    return {
      name: state.user.name,
      roles: state.user.roles,
      userId: state.user.id,
      avatar: state.user.services.steam.avatar.large,
    };
  }),
  injectSheet(UserInfo.styles),
)(UserInfo);
