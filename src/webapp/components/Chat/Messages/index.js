// @flow

import React from 'react';
import injectSheet from 'react-jss';
import {
  connect,
  type MapStateToProps,
} from 'react-redux';

import { makeGetMessagesForChat } from '../../../store/chats/selectors';
import { type State } from '../../../store';

import Message from './Message';

type ConnectedProps = {| messages: $ReadOnlyArray<string> |};
type OwnProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  chatId: string,
  classes: { messages: string },
};

const styles = {
  messages: {
    height: 200,
    overflowY: 'scroll',
    padding: 0,
    margin: 0,
  },
};

class Messages extends React.PureComponent<OwnProps & ConnectedProps> {
  listRef = React.createRef();

  getSnapshotBeforeUpdate(prevProps: OwnProps & ConnectedProps) {
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.
    if (prevProps.messages.length < this.props.messages.length && this.listRef.current) {
      return this.listRef.current.scrollHeight - this.listRef.current.scrollTop;
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null && this.listRef.current) {
      this.listRef.current.scrollTop = this.listRef.current.scrollHeight - snapshot;
    }
  }

  renderMessages() {
    return this.props.messages.map(id => (
      <Message
        key={id}
        messageId={id}
      />
    ));
  }

  render() {
    return (
      <ul
        ref={this.listRef}
        className={this.props.classes.messages}
      >
        {this.renderMessages()}
      </ul>
    );
  }
}

const makeMapStateToProps = (): MapStateToProps<State, OwnProps, ConnectedProps> => {
  const getMessagesForChat = makeGetMessagesForChat();

  return (state, props) => {
    return { messages: getMessagesForChat(state, props.chatId) };
  };
};

export default injectSheet(styles)(
  connect(makeMapStateToProps)(Messages),
);