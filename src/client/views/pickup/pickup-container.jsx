import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import flatten from 'lodash.flatten';
import {
  Spinner,
  Layout,
} from 'materialize-react';
import gamemodes from '@tf2-pickup/configs/gamemodes';

import app from '../../app';
import { updatePickup } from '../../redux/pickup-queue/actions';

import Pickup from './pickup';
import PickupTabs from './pickup-tabs';
import PickupInfo from './pickup-info';
import ReadyUpDialog from './ready-up-dialog';

/**
 * The container for the current pickup.
 *
 * @class
 */
class PickupContainer extends PureComponent {
  static propTypes = {
    connected: PropTypes.bool.isRequired,
    updatePickup: PropTypes.func.isRequired,
    gamemode: PropTypes.string.isRequired,
    user: PropTypes.shape({ id: PropTypes.string }),
    pickups: PropTypes.shape({}),
  };

  static defaultProps = {
    user: null,
    pickups: null,
  };

  /**
   * Update the pickups on mount.
   */
  componentWillMount() {
    this.updatePickups(get(this.props, 'user.settings.region', 'eu'));
  }

  /**
   * Check if the users region has changed or the user reconnected
   * and update the pickups is necessary.
   */
  componentWillReceiveProps(nextProps) {
    const nextRegion = get(nextProps, 'user.settings.region', 'eu');
    const region = get(this.props, 'user.settings.region', 'eu');
    const isConnectedAgain = !this.props.connected && nextProps.connected;

    if (region !== nextRegion || isConnectedAgain) {
      this.updatePickups(nextRegion);
    }
  }

  /**
   * Update the pickups for the passed region.
   *
   * @param {String} region - The region to update the pickups from.
   */
  async updatePickups(region) {
    const pickupQueue = app.service('pickup-queue');

    const pickups = await Promise.all(
      Object
        .keys(gamemodes)
        .map(gamemode => pickupQueue.get(`${region}-${gamemode}`)),
    );

    pickups.forEach((pickup) => {
      this.props.updatePickup(pickup);
    });
  }

  /**
   * Get the pickup for the current gamemode.
   *
   * @returns {(Object|null)} - Returns the pickup or null if we don't have the pickup yet.
   */
  get pickup() {
    return get(this.props.pickups, this.props.gamemode, null);
  }

  /**
   * Check if the current user is in the pickup.
   *
   * @returns {(Object|Boolean)} - Returns either the player data or false.
   */
  get isInPickup() {
    if (this.props.user && this.pickup) {
      const players = flatten(Object.values(this.pickup.classes));

      return players.find(player => player.id === this.props.user.id);
    }

    return false;
  }

  render() {
    const pickup = this.pickup;
    const isInPickup = this.isInPickup;

    if (pickup) {
      return (
        <Layout
          direction="column"
          crossAlign="center"
        >
          <PickupTabs gamemode={this.props.gamemode} />

          <PickupInfo
            pickup={pickup}
            isInPickup={isInPickup}
          />

          <Pickup
            gamemode={this.props.gamemode}
            pickup={pickup}
            isInPickup={isInPickup}
            user={this.props.user}
          />

          <ReadyUpDialog
            gamemode={this.props.gamemode}
            pickup={pickup}
            isInPickup={isInPickup}
          />
        </Layout>
      );
    }

    return (
      <Spinner active />
    );
  }
}

export default connect(
  (state) => {
    return {
      pickups: state.pickupQueue,
      user: state.user,
      connected: state.connected,
    };
  },
  (dispatch) => {
    return {
      updatePickup(pickup) {
        return dispatch(updatePickup(pickup.gamemode, pickup));
      },
    };
  },
)(PickupContainer);
