// @flow

import React from 'react';
import injectSheet from 'react-jss';
import {
  EditorState, convertToRaw,
} from 'draft-js';

import 'emoji-mart/css/emoji-mart.css';

import app from '../../../app';
import { type User } from '../../../../types/User';
import Emoji from '../../Emoji';

import Input from './Input';
import EmojiPicker from './EmojiPicker';

type OwnProps = {
  onlineUsers: $ReadOnlyArray<User>,
  chatId: string,
  classes: {
    inputContainer: string,
    emojiIcon: string,
  },
};
type LocalState = {
  editorState: EditorState,
  showEmojiPicker: boolean,
  lastEmoji: string,
};

const styles = {
  input: { flex: 1 },
  inputContainer: {
    position: 'relative',
    height: 40,
    display: 'flex',
    alignItems: 'center',
  },

  emojiIcon: {
    height: 32,
    width: 32,
    backgroundColor: 'white',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    padding: 4,
    cursor: 'pointer',
  },
};

class InputContainer extends React.PureComponent<OwnProps, LocalState> {
  state = {
    editorState: EditorState.createEmpty(),
    showEmojiPicker: false,
    lastEmoji: 'santa',
  };

  createMessage() {
    app.io.emit('messages:create', {
      message: convertToRaw(this.state.editorState.getCurrentContent()),
      chatId: this.props.chatId,
    }, () => null);
  }

  handleEmojiClick = () => {
    this.setState({ showEmojiPicker: true });
  };

  handleChange = (editorState) => {
    this.setState({ editorState });
  };

  handleReturn = () => {
    this.createMessage();
  };

  handleEmojiPickerClose = () => {
    this.setState({ showEmojiPicker: false });
  };

  handleEmojiSelect = (emoji) => {
    this.setState({
      lastEmoji: emoji.id,
      showEmojiPicker: false,
    });
  };

  render() {
    return (
      <span className={this.props.classes.inputContainer}>
        <Input
          value={this.state.editorState}
          onlineUsers={this.props.onlineUsers}
          onChange={this.handleChange}
          onReturn={this.handleReturn}
        />

        <span
          className={this.props.classes.emojiIcon}
          onClick={this.handleEmojiClick}
        >
          <Emoji emoji={this.state.lastEmoji} />
        </span>

        <EmojiPicker
          show={this.state.showEmojiPicker}
          onSelect={this.handleEmojiSelect}
          onClose={this.handleEmojiPickerClose}
        />
      </span>
    );
  }
}

export default injectSheet(styles)(InputContainer);
