import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import {
  Card,
  Button,
} from 'materialize-react';
import { connect } from 'react-redux';

import hasPermission from '../../../utils/has-permission';
import {
  map,
  pipe,
  find,
} from '../../../utils/functions';
import app from '../../app';

class Actions extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({ card: PropTypes.string.isRequired }).isRequired,
    pickup: PropTypes.shape({
      status: PropTypes.string.isRequired,
      teams: PropTypes.shape({}),
    }).isRequired,
  };

  static styles = {
    card: {
      margin: 0,
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  };

  get canReserveServer() {
    return this.props.pickup.status === 'server-reservation-error'
           && hasPermission('pickup.reserve-server', this.props.user);
  }

  get canReconfigureServer() {
    const { status } = this.props.pickup;

    return status !== 'setting-up-server'
           && status !== 'server-reservation-error'
           && hasPermission('servers.configure', this.props.user);
  }

  get canEndPickup() {
    return hasPermission('pickup.end', this.props.user);
  }

  get isInPickup() {
    return pipe(
      Object.values,
      map(Object.values),
      find(player => player.id === this.props.user.id),
    )(this.props.pickup.teams);
  }

  get hasActions() {
    return this.canReserveServer
           || this.canReconfigureServer
           || this.canEndPickup
           || this.isInPickup;
  }

  handleEndPickup = () => {
    app.io.emit('pickup.end', { pickupId: this.props.pickup.id });
  };

  handleReserveServer = () => {
    app.io.emit('pickup.reserve-server', { pickupId: this.props.pickup.id });
  };

  handleConfigureServer = () => {
    app.io.emit('servers.configure', { pickupId: this.props.pickup.id });
  };

  render() {
    const { status } = this.props.pickup;

    if (status === 'game-finished' || !this.props.user) {
      return null;
    }

    if (!this.hasActions) {
      return null;
    }

    return (
      <Card className={this.props.classes.card}>
        {this.canReserveServer ? (
          <Button onPress={this.handleReserveServer}>
            Reserve server
          </Button>
        ) : null}

        {this.canReconfigureServer ? (
          <Button onPress={this.handleConfigureServer}>
            Reconfigure server
          </Button>
        ) : null}

        {this.canEndPickup ? (
          <Button onPress={this.handleEndPickup}>
            End Pickup
          </Button>
        ) : null}

        {this.isInPickup ? (
          <Button>
            Mark as failed
          </Button>
        ) : null}
      </Card>
    );
  }
}

export default connect(
  (state) => {
    return { user: state.user };
  },
)(injectSheet(Actions.styles)(Actions));
