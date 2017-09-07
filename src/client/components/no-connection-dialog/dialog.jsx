import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Dialog,
  Button,
} from 'materialize-react';

import app from '../../app';

class NoConnectionDialog extends PureComponent {
  static propTypes = { connected: PropTypes.bool.isRequired };

  static handleReconnectPress = () => app.io.connect();

  static Dialog = () => (
    <div>
      <Dialog.Header>No connection</Dialog.Header>

      <Dialog.Content>
        Please make sure you have a internet connection.

        <br />

        If you have one, our server might be down currently.
        If you can't reconnect to our server in a few minutes
        contact an admin.
      </Dialog.Content>

      <Dialog.Buttons>
        <Button onPress={NoConnectionDialog.handleReconnectPress}>
          Reconnect
        </Button>
      </Dialog.Buttons>
    </div>
  );

  componentDidMount() {
    this.timeout = setTimeout(() => {
      if (!this.props.connected) {
        this.dialog.open();

        this.initialConnect = false;
      }
    }, 1000);
  }

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
