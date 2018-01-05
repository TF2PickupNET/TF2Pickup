import React, { PureComponent } from 'react';
import { TextField } from 'materialize-react';
import PropTypes from 'prop-types';

import app from '../../../app';
import {
  filter,
  pipe,
  pluck,
} from '../../../../utils/functions';

const lastMentionRegex = /.*@(\w+)$/;

/**
 * The input field for the chat.
 *
 * @class
 */
export default class Input extends PureComponent {
  static propTypes = { chat: PropTypes.string.isRequired };

  state = { value: '' };

  /**
   * Update the state when the input state changes.
   *
   * @param {Object} ev - The event object.
   */
  handleChange = (ev) => {
    this.setState({ value: ev.target.value });
  };

  /**
   * Emit the add-message event when the user presses enter and reset the input field.
   *
   * @param {Object} ev - The event object.
   */
  handleKeyDown = async (ev) => {
    switch (ev.keyCode) {
      case 13: {
        await app.service('chat').create({
          chat: this.props.chat,
          message: ev.target.value,
        });

        this.setState({ value: '' });
        break;
      }
      case 9: {
        const mention = ev.target.value.match(/.*@(\w+)$/);

        if (mention) {
          ev.preventDefault();

          const name = mention[1];
          const users = pipe(
            pluck('onlineUsers'),
            Object.values,
            filter(user => user.name.startsWith(name)),
          )(app.store.getState());

          if (users.length === 1) {
            const newValue = ev.target.value.replace(`@${name}`, `@${users[0].name}`);

            this.setState({ value: newValue });
          }
        }

        break;
      }
      default: break;
    }
  };

  render() {
    return (
      <TextField
        value={this.state.value}
        placeholder="Type something cool..."
        inputProps={{ onKeyDown: this.handleKeyDown }}
        onChange={this.handleChange}
      />
    );
  }
}
