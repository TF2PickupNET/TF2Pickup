import React, { PureComponent } from 'react';
import classnames from 'classnames';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { differenceInMilliseconds } from 'date-fns';
import { Progress } from 'materialize-react';
import gamemodes from '@tf2-pickup/configs/gamemodes';

/**
 * A component which renders info about the current pickup.
 *
 * @class
 */
class ProgressBar extends PureComponent {
  static propTypes = {
    pickup: PropTypes.shape({
      status: PropTypes.string.isRequired,
      gamemode: PropTypes.string.isRequired,
      readyUp: PropTypes.instanceOf(Date),
      classes: PropTypes.shape({}).isRequired,
    }).isRequired,
    classes: PropTypes.shape({
      progress: PropTypes.string.isRequired,
      showProgress: PropTypes.string.isRequired,
    }).isRequired,
  };

  static styles = {
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
   * Check if the current pickup entered the ready up phase and create a new interval.
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
   * Calculate the current progress.
   *
   * @returns {Number} - Returns the progress.
   */
  get progress() {
    const gamemodeInfo = gamemodes[this.props.pickup.gamemode];

    return this.state.progress / (gamemodeInfo.readyUpTime * 1000) * 100;
  }

  render() {
    return (
      <Progress
        className={classnames(
          this.props.classes.progress,
          { [this.props.classes.showProgress]: this.props.pickup.status === 'ready-up' },
        )}
        progress={this.progress}
      />
    );
  }
}

export default injectSheet(ProgressBar.styles)(ProgressBar);
