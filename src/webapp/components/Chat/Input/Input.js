// @flow

import React from 'react';
import { EditorState } from 'draft-js';
import injectSheet from 'react-jss';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createMentionPlugin from 'draft-js-mention-plugin';

import 'draft-js-emoji-plugin/lib/plugin.css';
import 'draft-js-mention-plugin/lib/plugin.css';

import { type User } from '../../../../types/User';
import UserItem from '../../UserItem';

import Suggestion from './Suggestion';

type Props = {
  onlineUsers: $ReadOnlyArray<User>,
  onReturn: () => void,
  value: EditorState,
  onChange: (state: EditorState) => EditorState,
  classes: { container: string },
};
type State = {
  suggestions: $ReadOnlyArray<User>,
};

const styles = {
  container: {
    height: 32,
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    padding: '6px 5px 5px',
  },
};

class Input extends React.PureComponent<Props, State> {
  mentionPlugin = createMentionPlugin({
    mentionPrefix: '@',
    mentionComponent: ({ mention }) => <UserItem userId={mention.id} />,
  });

  emojiPlugin = createEmojiPlugin();

  editor = React.createRef();

  plugins = [
    this.mentionPlugin,
    this.emojiPlugin,
  ];

  state = { suggestions: [] };

  onReturn = () => {
    this.props.onReturn();

    return 'handled';
  };

  handleSearchChange = ({ value }) => {
    const searchValue = value.toLowerCase();
    const suggestions = this.props.onlineUsers.filter(
      user => user.name !== null && user.name.toLowerCase().includes(searchValue)
    );

    this.setState({ suggestions });
  };

  handleClick = () => {
    if (this.editor.current !== null) {
      this.editor.current.focus();
    }
  };

  render() {
    const { MentionSuggestions } = this.mentionPlugin;
    const { EmojiSuggestions } = this.emojiPlugin;

    return (
      <div
        className={this.props.classes.container}
        onClick={this.handleClick}
      >
        <Editor
          ref={this.editor}
          editorState={this.props.value}
          plugins={this.plugins}
          handleReturn={this.onReturn}
          onChange={this.props.onChange}
        />

        <EmojiSuggestions />

        <MentionSuggestions
          suggestions={this.state.suggestions}
          entryComponent={Suggestion}
          onSearchChange={this.handleSearchChange}
        />
      </div>
    );
  }
}

export default injectSheet(styles)(Input);

