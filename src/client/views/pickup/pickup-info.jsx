import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { differenceInMilliseconds } from 'date-fns';
import {
  Button,
  Card,
  breakpoints,
  Progress,
} from 'materialize-react';

import gamemodes from '@tf2-pickup/configs/gamemodes';

/**
 * A component which renders info about the current pickup.
 *
 * @class
 */
class PickupInfo extends PureComponent {
  static propTypes = {
    pickup: PropTypes.shape({
      status: PropTypes.string.isRequired,
      gamemode: PropTypes.string.isRequired,
      readyUp: PropTypes.instanceOf(Date),
    }).isRequired,
    classes: Progress.shape({
      container: PropTypes.string.isRequired,
      item: PropTypes.string.isRequired,
      progress: PropTypes.string.isRequired,
      showProgress: PropTypes.string.isRequired,
    }).isRequired,
    isInPickup: PropTypes.shape({}).isRequired,
  };

  static styles = {
    container: {
      display: 'flex',
      height: 64,
      padding: 8,
      marginBottom: 24,
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative',

      [breakpoints.up('desktop')]: {
        '&[data-gamemode="6v6"]': { maxWidth: 300 * 5 + 4 * 16 },

        '&[data-gamemode="9v9"]': { maxWidth: 360 * 3 + 2 * 16 },

        '&[data-gamemode="bball"], &[data-gamemode="ultiduo"]': { maxWidth: 360 * 2 + 16 },
      },
    },

    item: {
      padding: '0 8px',
      height: 48,
      flex: 1,
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    progress: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      opacity: 0,
      borderBottomLeftRadius: 2,
      borderBottomRightRadius: 2,
      transition: 'opacity 200ms',
    },

    showProgress: { opacity: 1 },
  };

  state = { progress: 0 };

  /**
   * When the initial pickup is in ready up state, we need to create a new interval.
   */
  componentDidMount() {
    if (this.props.pickup.status === 'ready-up') {
      this.interval = setInterval(this.calculateProgress, 180);
    }
  }

  /**
   * Check if the current pickup entered the ready up phase and create a new interval.
   *
   * @param prevProps
   */
  componentDidUpdate(prevProps) {
    if (this.props.pickup.status === 'ready-up' && prevProps.pickup.status !== 'ready-up') {
      this.interval = setInterval(this.calculateProgress, 150);
    }
  }

  /**
   * Clear the interval when the component unmounts.
   */
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  interval = null;

  /**
   * Calculate the progress of the current ready up phase.
   */
  calculateProgress = () => {
    if (this.props.pickup.status === 'ready-up') {
      this.setState({ progress: differenceInMilliseconds(new Date(), this.props.pickup.readyUp) });
    } else {
      // Reset the status and clear the interval
      this.setState({ progress: 0 });

      window.clearInterval(this.interval);
    }
  };

  /**
   * Get the pretty status to show.
   *
   * @returns {String} - Returns the pretty status.
   */
  getStatus() {
    switch (this.props.pickup.status) {
      case 'waiting': return 'Waiting';
      case 'ready-up': return 'Ready Up';
      case 'making-teams': return 'Making Teams';
      default: return 'Unknown status';
    }
  }

  render() {
    const { pickup } = this.props;
    const isInReadyUpMode = pickup.status === 'ready-up';
    const progressClasses = classnames(
      this.props.classes.progress,
      isInReadyUpMode && this.props.classes.showProgress,
    );

    const playerCount = Object
      .keys(pickup.classes)
      .reduce((total, className) => {
        const max = gamemodes[pickup.gamemode].slots[className];

        return total + Math.min(pickup.classes[className].length, max);
      }, 0);

    return (
      <Card
        className={this.props.classes.container}
        data-gamemode={this.props.pickup.gamemode}
      >
        <span className={this.props.classes.item}>
          Status: {this.getStatus()}
        </span>

        <span className={this.props.classes.item}>
          <Button disabled={!this.props.isInPickup}>
            Pre Ready
          </Button>
        </span>

        <span className={this.props.classes.item}>
          <Button disabled={!this.props.isInPickup}>
            Vote for map
          </Button>
        </span>

        <span className={this.props.classes.item}>
          Players: {playerCount} / {gamemodes[pickup.gamemode].maxPlayers}
        </span>

        <Progress
          className={progressClasses}
          progress={this.state.progress / (gamemodes[pickup.gamemode].readyUpTime * 1000) * 100}
        />
      </Card>
    );
  }
}

export default injectSheet(PickupInfo.styles)(PickupInfo);
