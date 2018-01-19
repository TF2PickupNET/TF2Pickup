import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { pluck } from '../../../../utils/functions';
import { getGamemodeFromUrl } from '../../../../utils/pickup-queue';
import app from '../../../app';

import Chat from './chat';

/**
 * The chat component.
 *
 * @class
 */
class ChatContainer extends PureComponent {
  static propTypes = {
    region: PropTypes.string.isRequired,
    gamemode: PropTypes.string.isRequired,
  };

  state = { selectedChat: this.props.region };

  /**
   * Change the region when the user changes his region.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.region !== this.props.region) {
      this.setState((state) => {
        if (state.selectedChat === this.props.region) {
          return { selectedChat: nextProps.region };
        }

        return null;
      });
    }

    /**
     * Hack for updating the tabs bar when the gamemode changes and with that the width.
     */
    if (nextProps.gamemode !== this.props.gamemode) {
      this.setState((state) => {
        return { selectedChat: state.selectedChat === 'global' ? nextProps.region : 'global' };
      }, () => {
        this.setState((state) => {
          return { selectedChat: state.selectedChat === 'global' ? nextProps.region : 'global' };
        });
      });
    }
  }

  /**
   * Change the selected chat when the tab changes.
   */
  handleChatChange = (tab) => {
    this.setState({ selectedChat: tab });
  };

  /**
   * Emit the add-message event when the user submits the input.
   */
  handleSubmit = (message) => {
    app.io.emit('chat.add-message', {
      message,
      chat: this.state.selectedChat,
    });
  };

  render() {
    return (
      <Chat
        chat={this.state.selectedChat}
        region={this.props.region}
        onChatChange={this.handleChatChange}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default connect((state) => {
  return {
    region: pluck('settings.region', 'eu')(state.user),
    gamemode: getGamemodeFromUrl(state.router.location.pathname),
  };
})(ChatContainer);
