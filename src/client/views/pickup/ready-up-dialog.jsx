import React, { PureComponent } from 'react';
import {
  Dialog,
  Button,
} from 'materialize-react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Aux from 'react-aux';

import app from '../../app';

/**
 * The component to render the ready up dialog and open or close it when needed.
 *
 * @class
 */
export default class ReadyUpDialog extends PureComponent {
  static propTypes = {
    pickup: PropTypes.shape({ status: PropTypes.string.isRequired }).isRequired,
    gamemode: PropTypes.string.isRequired,
  };

  /**
   * Get whether or not the dialog should be opened.
   *
   * @param {Object} props - The props the state should be calculated from.
   * @returns {Boolean} - Returns whether or not the dialog should be opened.
   */
  static getDialogStatus(props) {
    return props.pickup.status === 'ready-up'
           && props.isInPickup
           && !props.isInPickup.ready;
  }

  /**
   * Check the status when the component mounts.
   */
  componentDidMount() {
    if (ReadyUpDialog.getDialogStatus(this.props)) {
      this.dialog.open();
    }
  }

  /**
   * Check if the dialog should be closed or opened when the props change.
   */
  componentWillReceiveProps(nextProps) {
    const nextStatus = ReadyUpDialog.getDialogStatus(nextProps);
    const currentStatus = ReadyUpDialog.getDialogStatus(this.props);

    if (nextStatus !== currentStatus) {
      if (nextStatus) {
        this.dialog.open();
      } else {
        this.dialog.close();
      }
    }
  }

  Dialog = () => (
    <Aux>
      <Dialog.Header>
        Are you ready to play?
      </Dialog.Header>

      <Dialog.Buttons>
        <Button onPress={this.handleNoPress}>
          No
        </Button>

        <Button onPress={this.handleYesPress}>
          Yes
        </Button>
      </Dialog.Buttons>
    </Aux>
  );

  /**
   * Ready the user up.
   */
  handleYesPress = () => {
    app.io.emit('pickup-queue.ready-up', { gamemode: this.props.gamemode });
  };

  /**
   * Remove the user from the queue.
   */
  handleNoPress = () => {
    app.io.emit('pickup-queue.remove', { gamemode: this.props.gamemode });
  };

  render() {
    return (
      <Aux>
        {this.props.pickup.status === 'ready-up' && (
          <Helmet>
            <title>Ready Up</title>
          </Helmet>
        )}

        <Dialog
          ref={(element) => { this.dialog = element; }}
          closeOnOutsideClick={false}
          component={this.Dialog}
        />
      </Aux>
    );
  }
}
