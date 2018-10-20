// @flow

import React from 'react';
import {
  connect,
  type MapStateToProps,
} from 'react-redux';
import injectSheet from 'react-jss';

import { fetchChat } from '../../store/chats/actions';
import { type State } from '../../store';
import { makeGetChatById } from '../../store/chats/selectors';

import Messages from './Messages';
import OnlineUsers from './OnlineUsers';
import Input from './Input';

type ConnectedProps = {|
  hasFetchedChat: boolean,
  onlineUsers: $ReadOnlyArray<string>,
|};
type DispatchProps = {| fetchChat: (chatId: string) => void |};
type OwnProps = {
  getOnlineUsers: (state: State, chatId: string) => $ReadOnlyArray<string>,
  chatId: string,
  classes: {
    chat: string,
    messagesContainer: string,
  },
};

const styles = {
  chat: {
    display: 'flex',
    flexDirection: 'row',
  },

  messagesContainer: { flex: 3 },
};

class Chat extends React.PureComponent<OwnProps & ConnectedProps & DispatchProps> {
  componentDidMount() {
    if (this.props.hasFetchedChat) {
      this.props.fetchChat(this.props.chatId);
    }
  }

  render() {
    return (
      <div className={this.props.classes.chat}>
        <div className={this.props.classes.messagesContainer}>
          <Messages chatId={this.props.chatId} />

          <Input
            onlineUsers={this.props.onlineUsers}
            chatId={this.props.chatId}
          />
        </div>

        <OnlineUsers onlineUsers={this.props.onlineUsers} />
      </div>
    );
  }
}

const makeMapStateToProps = (): MapStateToProps<State, OwnProps, ConnectedProps> => {
  const getChatById = makeGetChatById();

  return (state, props) => {
    return {
      hasFetchedChat: Boolean(getChatById(state, props.chatId)),
      onlineUsers: props.getOnlineUsers(state, props.chatId),
    };
  };
};
const mapDispatchToProps = (dispatch): DispatchProps => {
  return { fetchChat: chatId => dispatch(fetchChat(chatId)) };
};

export default injectSheet(styles)(
  connect(makeMapStateToProps, mapDispatchToProps)(Chat),
);

