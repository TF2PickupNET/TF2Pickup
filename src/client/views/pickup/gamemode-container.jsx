import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import flatten from 'lodash.flatten';

import app from '../../app';
import { updatePickup } from '../../redux/pickup-queue/actions';

import Gamemode from './gamemode';

class GamemodeContainer extends PureComponent {
  componentWillMount() {
    this.updateRegion(get(this.props, 'user.settings.region', 'eu'));
  }

  componentWillReceiveProps(nextProps) {
    const nextRegion = get(nextProps, 'user.settings.region');
    const region = get(this.props, 'user.settings.region');

    if (region !== nextRegion) {
      this.updateRegion(nextRegion);
    }
  }

  async updateRegion(region) {
    const pickupQueue = app.service('pickup-queue');
    const pickups = await pickupQueue.find({ query: { region } });

    pickups.forEach(pickup => this.props.updatePickup(pickup));
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

  join = (className) => {
    app.io.emit('pickup-queue.join', {
      className,
      gamemode: this.props.gamemode,
    });
  };

  remove = () => {
    app.io.emit('pickup-queue.remove', { gamemode: this.props.gamemode });
  };

  render() {
    return (
      <Gamemode
        join={this.join}
        remove={this.remove}
        gamemode={this.props.gamemode}
        pickup={this.pickup}
        isInPickup={this.isInPickup}
        user={this.props.user}
      />
    );
  }
}

export default connect(
  (state) => {
    return {
      pickups: state.pickupQueue,
      user: state.user,
    };
  },
  (dispatch) => {
    return {
      updatePickup(pickup) {
        return dispatch(updatePickup(pickup.gamemode, pickup));
      },
    };
  },
)(GamemodeContainer);
