import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import {
  Card,
  Button,
} from 'materialize-react';
import { connect } from 'react-redux';

import hasPermission from '../../../utils/has-permission';
import app from '../../app';
import { getPlayer } from '../../../utils/pickup';

/**
 * The actions row for a match.
 *
 * @class
 */
class Actions extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({ card: PropTypes.string.isRequired }).isRequired,
    pickup: PropTypes.shape({
      id: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      teams: PropTypes.shape({}),
    }).isRequired,
    user: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
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

  /**
   * Check if the current user can reserve a server.
   *
   * @returns {Boolean} - Returns true of false.
   */
  get canReserveServer() {
    return this.props.pickup.status === 'server-reservation-error'
           && hasPermission('pickup.reserve-server', this.props.user);
  }

  /**
   * Check if the user can reconfigure a server.
   *
   * @returns {Boolean} - Returns true or false.
   */
  get canReconfigureServer() {
    const { status } = this.props.pickup;

    return status !== 'setting-up-server'
           && status !== 'server-reservation-error'
           && hasPermission('server.configure', this.props.user);
  }

  /**
   * Check if the user can end the pickup.
   *
   * @returns {Boolean} - Returns true or false.
   */
  get canEndPickup() {
    return hasPermission('pickup.end', this.props.user);
  }

  /**
   * Check if the user is in the pickup.
   *
   * @returns {Boolean} - Returns true or false.
   */
  get isInPickup() {
    return getPlayer(this.props.user.id)(this.props.pickup);
  }

  /**
   * Check if the user can perform any actions.
   *
   * @returns {Boolean} - Returns true or false.
   */
  get hasActions() {
    return this.canReserveServer
           || this.canReconfigureServer
           || this.canEndPickup
           || this.isInPickup;
  }

  /**
   * End the pickup.
   */
  handleEndPickup = () => {
    app.io.emit('pickup.end', { pickupId: this.props.pickup.id });
  };

  /**
   * Reserve a server for the pickup.
   */
  handleReserveServer = () => {
    app.io.emit('pickup.reserve-server', { pickupId: this.props.pickup.id });
  };

  /**
   * Reconfigure the server.
   */
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
