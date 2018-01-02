import React from 'react';
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
    <span>
      <Date
        withoutDay
        date={props.message.createdOn}
      /> <UserItem user={props.message.user} />: <span>{props.message.message}</span>
    </span>
  );
}

Message.propTypes = {
  message: PropTypes.shape({
    createdOn: PropTypes.string.isRequired,
    user: PropTypes.shape({}).isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};

export default Message;
