import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { differenceInMilliseconds } from 'date-fns/esm';
import { gamemodes } from '@tf2-pickup/config';
import { connect } from 'react-redux';
import { pluck } from '@tf2-pickup/utils';

import playSound from '../../../utils/play-sound';
import { getPlayer } from '../../../../utils/pickup-queue';

/**
 * A component which renders info about the current pickup.
 *
 * @class
 */
class PickupSounds extends PureComponent {
  static propTypes = {
    status: PropTypes.string.isRequired,
    readyUp: PropTypes.string,
    gamemode: PropTypes.string.isRequired,
    announcer: PropTypes.string,
    isInPickup: PropTypes.bool,
  };

  static defaultProps = {
    readyUp: null,
    announcer: null,
    isInPickup: false,
  };

  /**
   * Check if the current pickup entered the ready up phase and create a new interval.
   */
  componentDidUpdate(prevProps) {
    if (this.props.status === 'ready-up' && prevProps.status !== 'ready-up') {
      this.interval = setInterval(this.playSounds, 1000);

      if (this.props.isInPickup) {
        playSound(`${this.props.announcer}/ready_up`);
      }
    }
  }

  /**
   * Clear the interval when the component unmounts.
   */
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  interval = null;

  playedWhoNotReady = false;

  playedCountdownSound = false;

  /**
   * Calculate the progress of the current ready up phase.
   */
  playSounds = () => {
    if (this.props.status !== 'ready-up') {
      window.clearInterval(this.interval);
    }

    if (!this.props.isInPickup) {
      return;
    }

    if (this.props.status === 'ready-up') {
      const diff = differenceInMilliseconds(new Date(), this.props.readyUp);
      const gamemodeInfo = gamemodes[this.props.gamemode];

      if (!this.playedWhoNotReady && diff > 16 * 1000) {
        playSound(`${this.props.announcer}/whonotready`);

        this.playedWhoNotReady = true;
      } else if (!this.playedCountdownSound && diff > (gamemodeInfo.readyUpTime - 4.5) * 1000) {
        playSound(`${this.props.announcer}/countdown`);

        this.playedCountdownSound = true;
      }
    } else {
      this.playedWhoNotReady = false;
      this.playedCountdownSound = false;

      if (this.props.status === 'waiting') {
        playSound(`${this.props.announcer}/afkskicked`);
      }
    }
  };

  render() {
    return null;
  }
}

export default connect(
  (state, props) => {
    const pickup = state.pickupQueue[props.gamemode];

    return {
      status: pickup.status,
      readyUp: pickup.readyUp,
      announcer: state.user ? state.user.settings.announcer : null,
      isInPickup: Boolean(getPlayer(pluck('user.id')(state))(pickup)),
    };
  },
)(PickupSounds);
