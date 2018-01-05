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
      <span className={props.classes.date}>
        <Date
          withoutDay
          date={props.message.createdOn}
        />
      </span>

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
    date: PropTypes.string.isRequired,
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
    boxSizing: 'border-box',
    minHeight: 20,
  },

  date: { lineHeight: '20px' },

  userItem: {
    marginLeft: 4,
    lineHeight: '20px',
    height: 20,

    '& .icon::before': { lineHeight: '1 !important' },
  },

  message: {
    marginLeft: 4,
    lineHeight: '20px',
    flex: 1,
    wordBreak: 'break-word',
  },
};

export default injectSheet(Message.styles)(Message);
