import React, { PureComponent } from 'react';
import get from 'lodash.get';
import {
  Dialog,
  Button,
  colors,
} from 'materialize-react';

export default class ReadyUpDialog extends PureComponent {
  Component = () => (
    <div>
      <Dialog.Header>
        Are you ready to play?
      </Dialog.Header>

      <Dialog.Buttons>
        <Button onPress={this.handlePress(this.props.remove)}>
          No
        </Button>

        <Button onPress={this.handlePress(this.props.readyUp)}>
          Yes
        </Button>
      </Dialog.Buttons>
    </div>
  );

  handlePress = func => () => func();

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
