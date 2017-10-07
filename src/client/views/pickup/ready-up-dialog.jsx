import React, { PureComponent } from 'react';
import {
  Dialog,
  Button,
} from 'materialize-react';
import Helmet from 'react-helmet';
import Aux from 'react-aux';

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

  static getDialogStatus(props) {
    return props.pickup.status === 'ready-up'
           && props.isInPickup
           && !props.isInPickup.ready;
  }

  componentDidMount() {
    if (ReadyUpDialog.getDialogStatus(this.props)) {
      this.dialog.open();
    }
  }

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
          component={this.Component}
        />
      </Aux>
    );
  }
}
