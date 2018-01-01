import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import {
  pipe,
  pluck,
} from '../../../../utils/functions';

import Message from './message';

class MessagesContainer extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({ container: PropTypes.string.isRequired }).isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  };

  static styles = {
    container: {
      composes: 'scrollbar',
      overflowY: 'scroll',
      display: 'flex',
      flexDirection: 'column',
    },
  };

  componentDidMount() {
    this.container.scrollTop = this.container.scrollHeight;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages.length < this.props.messages.length) {
      this.container.scrollTop = this.container.scrollHeight;
    }
  }

  render() {
    return (
      <div
        className={this.props.classes.container}
        ref={(element) => { this.container = element; }}
      >
        {this.props.messages.map(message => (
          <Message
            key={message._id}
            message={message}
          />
        ))}
      </div>
    );
  }
}

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
