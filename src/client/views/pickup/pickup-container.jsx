import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import flatten from 'lodash.flatten';
import { Spinner } from 'materialize-react';

import gamemodes from '@tf2-pickup/configs/gamemodes';

import app from '../../app';
import { updatePickup } from '../../redux/pickup-queue/actions';

import Pickup from './pickup';
import PickupTabs from './pickup-tabs';
import PickupInfo from './pickup-info';
import ReadyUpDialog from './ready-up-dialog';

class PickupContainer extends PureComponent {
  componentWillMount() {
    this.updateRegion(get(this.props, 'user.settings.region', 'eu'));
  }

  componentWillReceiveProps(nextProps) {
    const nextRegion = get(nextProps, 'user.settings.region');
    const region = get(this.props, 'user.settings.region');
    const isConnectedAgain = !this.props.connected && nextProps.connected;

    if (region !== nextRegion || isConnectedAgain) {
      this.updateRegion(nextRegion);
    }
  }

  async updateRegion(region) {
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

  get pickup() {
    return get(this.props.pickups, this.props.gamemode, null);
  }

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
        <div
          // TODO: Move those into JSS or solve this through a common layout component
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
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
        </div>
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
