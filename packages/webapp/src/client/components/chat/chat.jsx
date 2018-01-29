import React from 'react';
import PropTypes from 'prop-types';
import Aux from 'react-aux';

import MessagesContainer from './messages-container';
import Input from './input';

/**
 * Render a chat with an input.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
function Chat(props) {
  return (
    <Aux>
      <MessagesContainer messages={props.messages} />

      <Input onSubmit={props.onSubmit} />
    </Aux>
  );
}

Chat.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Chat;
