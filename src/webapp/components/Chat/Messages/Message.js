// @flow

import React from 'react';
import injectSheet from 'react-jss';
import {
  connect,
  type MapStateToProps,
} from 'react-redux';

import { type Message as MessageType } from '../../../../types/Message';
import { makeGetMessageById } from '../../../store/messages/selectors';
import UserItem from '../../UserItem';
import { type State } from '../../../store';

type OwnProps = { messageId: string };
type ConnectedProps = { message: MessageType };

const styles = {};

class Message extends React.PureComponent<OwnProps & ConnectedProps> {
  renderMessage() {

  }

  render() {
    return (
      <li>
        <UserItem userId={this.props.message.userId} />:

        {this.renderMessage()}
      </li>
    );
  }
}

const makeMapStateToProps = (): MapStateToProps<State, OwnProps, ConnectedProps> => {
  const getMessageById = makeGetMessageById();

  return (state, props) => {
    return { message: getMessageById(state, props.messageId) };
  };
};

export default injectSheet(styles)(
  connect(makeMapStateToProps)(Message)
);
