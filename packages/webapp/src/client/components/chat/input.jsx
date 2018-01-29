import React, { PureComponent } from 'react';
import { TextField } from 'materialize-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  filter,
  pipe,
  pluck,
} from '@tf2-pickup/utils';

import app from '../../app';

/**
 * The input field for the chat.
 *
 * @class
 */
class Input extends PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    userId: PropTypes.string,
  };

  static defaultProps = { userId: null };

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
  handleKeyDown = (ev) => {
    switch (ev.keyCode) {
      case 13: {
        this.props.onSubmit(ev.target.value);

        this.setState({ value: '' });
        break;
      }
      case 9: {
        const mention = ev.target.value.match(/.*@(\w+)$/);

        if (mention) {
          ev.preventDefault();

          const name = mention[1];
          const regex = new RegExp(`^${name}`, 'i');
          const users = pipe(
            pluck('onlineUsers'),
            Object.values,
            filter(user => regex.test(user.name)),
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
    if (!this.props.userId) {
      return null;
    }

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

export default connect(
  (state) => {
    return { userId: pluck('user.id')(state) };
  },
)(Input);
