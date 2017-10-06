import React, { PureComponent } from 'react';
import {
  Dialog,
  Button,
} from 'materialize-react';

import app from '../../app';

export default class ReadyUpDialog extends PureComponent {
  Component = () => (
    <div>
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
    </div>
  );

  handleYesPress = () => {
    app.io.emit('pickup-queue.ready-up', { gamemode: this.props.gamemode });
  };

  handleNoPress = () => {
    app.io.emit('pickup-queue.remove', { gamemode: this.props.gamemode });
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isInPickup) {
      if (this.props.isInPickup && this.props.pickup.status === 'ready-up') {
        this.dialog.close();
      }

      return;
    }

    const nextStatus = nextProps.pickup.status;
    const currentStatus = this.props.pickup.status;

    if (nextStatus === 'ready-up' && currentStatus !== 'ready-up') {
      if (!nextProps.isInPickup.ready) {
        this.dialog.close();

        this.dialog.open();
      }
    } else if (nextProps.isInPickup.ready && !this.props.isInPickup.ready) {
      this.dialog.close();
    } else if (nextStatus !== 'ready-up' && currentStatus === 'ready-up') {
      this.dialog.close();
    }
  }

  render() {
    return (
      <Dialog
        ref={(element) => { this.dialog = element; }}
        component={this.Component}
      />
    );
  }
}
