import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

import UserItem from '../../../components/user-item';
import Date from '../../../components/date';

/**
 * Render the message of a user.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
function Message(props) {
  return (
    <span className={props.classes.container}>
      <Date
        withoutDay
        date={props.message.createdOn}
      />
      <UserItem
        user={props.message.user}
        className={props.classes.userItem}
      />:

      <span className={props.classes.message}>
        {props.message.message}
      </span>
    </span>
  );
}

Message.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string.isRequired,
    userItem: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  message: PropTypes.shape({
    createdOn: PropTypes.string.isRequired,
    user: PropTypes.shape({}).isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};

Message.styles = {
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    minHeight: 20,
    lineHeight: '20px',
  },

  userItem: {
    marginLeft: 4,
    lineHeight: '20px',

    '& .icon::before': { lineHeight: '1 !important' },
  },

  message: {
    marginLeft: 4,
    lineHeight: '20px',
  },
};

export default injectSheet(Message.styles)(Message);
