import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';

import {
  pipe,
  pluck,
} from '../../../../utils/functions';

import Message from './message';

function MessagesContainer(props) {
  return (
    <div className={props.classes.container}>
      {props.messages.map(message => (
        <Message
          key={message._id}
          message={message}
        />
      ))}
    </div>
  );
}

MessagesContainer.styles = {
  container: {
    composes: 'scrollbar',
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column',
  },
};

export default pipe(
  injectSheet(MessagesContainer.styles),
  connect(
    (state, props) => {
      const messages = pluck(props.chat, {})(state.chat);

      return {
        messages: Object
          .values(messages)
          .sort((mA, mB) => new Date(mA.createdOn) - new Date(mB.createdOn)),
      };
    },
  ),
)(MessagesContainer);
