import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import {
  pipe,
  pluck,
} from '../../../../utils/functions';

import Message from './message';
import hasPermission from '../../../../utils/has-permission';

/**
 * The container for the messages.
 *
 * @class
 */
class MessagesContainer extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({ container: PropTypes.string.isRequired }).isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    canDeleteMessages: PropTypes.bool.isRequired,
  };

  static styles = {
    container: {
      composes: 'scrollbar',
      flex: 1,
      overflowY: 'scroll',
      overflowX: 'hidden',
    },
  };

  /**
   * Scroll down to the bottom on mount.
   */
  componentDidMount() {
    this.container.scrollTop = this.container.scrollHeight;
  }

  /**
   * Scroll to the bottom the messages change.
   */
  componentDidUpdate(prevProps) {
    if (prevProps.messages.length !== this.props.messages.length) {
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
            canDeleteMessages={this.props.canDeleteMessages}
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
        canDeleteMessages: hasPermission('chat.delete', state.user),
      };
    },
  ),
)(MessagesContainer);
