import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Dialog,
  Button,
} from 'materialize-react';

import app from '../../app';

/**
 * A dialog which will open when the user looses the connection to the server.
 *
 * @class
 */
class NoConnectionDialog extends PureComponent {
  static propTypes = { connected: PropTypes.bool.isRequired };

  static handleReconnectPress = () => app.io.connect();

  static Dialog = () => (
    <div>
      <Dialog.Header>No connection</Dialog.Header>

      <Dialog.Content>
        Please make sure you have a working internet connection.
        <br />
        If you have a internet connection, we are most likely restarting the server.
        <br />
        If the server {'isn\'t'} back online in a few minutes, please contact one of the admins.
      </Dialog.Content>

      <Dialog.Buttons>
        <Button onPress={NoConnectionDialog.handleReconnectPress}>
          Reconnect
        </Button>
      </Dialog.Buttons>
    </div>
  );

  /**
   * Create a timeout after which the dialog will be opened.
   * This is used for the initial connect so when the user didn't connect after 1 second
   * to the server, we open the dialog.
   */
  componentDidMount() {
    this.timeout = setTimeout(() => {
      if (!this.props.connected) {
        this.dialog.open();

        this.initialConnect = false;
      }
    }, 1000);
  }

  /**
   * Close the dialog when the connected prop changes.
   */
  componentDidUpdate(prevProps) {
    if (prevProps.connected !== this.props.connected) {
      if (this.props.connected) {
        if (this.initialConnect) {
          clearTimeout(this.timeout);

          this.initialConnect = false;

          return;
        }

        this.dialog.close();
      } else {
        this.dialog.open();
      }
    }
  }

  initialConnect = true;

  render() {
    return (
      <Dialog
        ref={(element) => { this.dialog = element; }}
        closeOnOutsideClick={false}
        component={NoConnectionDialog.Dialog}
      />
    );
  }
}

export default connect(
  ({ connected }) => {
    return { connected };
  },
)(NoConnectionDialog);
