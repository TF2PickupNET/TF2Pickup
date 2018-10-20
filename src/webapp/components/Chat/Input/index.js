// @flow

import React from 'react';
import injectSheet from 'react-jss';
import { Mention } from 'antd';

import app from '../../../app';
import { type User } from '../../../../types/User';

type ConnectedProps = {
  lastPickupId: string,
};
type OwnProps = {
  onlineUsers: $ReadOnlyArray<User>,
  chatId: string,
};
type UserSuggestion = { type: 'user'} & User;
type PickupSuggestion = { type: 'pickupId', id: string };
type EmojiSuggestion = { type: 'emoji' };
type Suggestion = UserSuggestion | PickupSuggestion | EmojiSuggestion;
type LocalState = {
  suggestions: $ReadOnlyArray<Suggestion>,
  value: {},
};

class Input extends React.PureComponent<OwnProps & ConnectedProps, LocalState> {
  state = {
    suggestions: [],
    value: Mention.toContentState(''),
  };

  createMessage() {
    const message = Mention.toString(this.state.value);

    app.io.emit('messages:create-new', {
      message,
      chatId: this.props.chatId,
    });
  }

  handleUserMention(value) {
    const searchValue = value.toLowerCase();
    const suggestions = this.props.onlineUsers
      .filter(user => user.name !== null && user.name.toLowerCase().includes(searchValue))
      .map((user): { type: 'user'} & User => {
        return {
          ...user,
          type: 'user',
        };
      });

    this.setState({ suggestions });
  }

  handlePickupMention(value) {
    if (this.props.lastPickupId.includes(value)) {
      this.setState({
        suggestions: [{
          type: 'pickupId',
          id: this.props.lastPickupId,
        }],
      });
    }
  }

  handleEmojiMention(value) {
    const searchValue = value.toLowerCase();
    const suggestions = emojis
      .filter(emoji => emoji.name.toLowerCase().includes(searchValue))
      .map((user) => {
        return {
          ...user,
          type: 'emoji',
        };
      });

    this.setState({ suggestions });
  }

  handleSearchChange = (value, trigger) => {
    switch (trigger) {
      case '@': return this.handleUserMention(value);
      case '#': return this.handlePickupMention(value);
      case ':': return this.handleEmojiMention(value);
      default: return null;
    }
  };

  handleChange = (value) => {
    this.setState({ value });
  };

  handleKeyDown = () => {
    this.createMessage();
  };

  renderSuggestions() {
    return this.state.suggestions.map(suggestion => (
      <Mention.Nav
        key={suggestion.id}
        value={suggestion.id}
        data={suggestion}
      >
        {suggestion.type === 'pickupId' ? suggestion.id : suggestion.name}
      </Mention.Nav>
    ));
  }

  render() {
    return (
      <Mention
        value={this.state.value}
        style={{ width: '100%' }}
        suggestions={this.renderSuggestions()}
        prefix={[
          '@',
          '#',
          ':',
        ]}
        onChange={this.handleChange}
        onSearchChange={this.handleSearchChange}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}

export default injectSheet({})(Input);
