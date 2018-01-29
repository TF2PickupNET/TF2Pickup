import React, { PureComponent } from 'react';
import classnames from 'classnames';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { differenceInMilliseconds } from 'date-fns/esm';
import { Progress } from 'materialize-react';
import { gamemodes } from '@tf2-pickup/config';
import { connect } from 'react-redux';
import { pipe } from '@tf2-pickup/utils';

/**
 * A component which renders info about the current pickup.
 *
 * @class
 */
class ProgressBar extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      progress: PropTypes.string.isRequired,
      showProgress: PropTypes.string.isRequired,
    }).isRequired,
    status: PropTypes.string.isRequired,
    gamemode: PropTypes.string.isRequired,
    readyUp: PropTypes.string,
  };

  static defaultProps = { readyUp: null };

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
    if (this.props.status === 'ready-up' && prevProps.status !== 'ready-up') {
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
    if (this.props.status === 'ready-up') {
      this.setState({ progress: differenceInMilliseconds(new Date(), this.props.readyUp) });
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
    const gamemodeInfo = gamemodes[this.props.gamemode];

    return this.state.progress / (gamemodeInfo.readyUpTime * 1000) * 100;
  }

  render() {
    return (
      <Progress
        className={classnames(
          this.props.classes.progress,
          { [this.props.classes.showProgress]: this.props.status === 'ready-up' },
        )}
        progress={this.progress}
      />
    );
  }
}

export default pipe(
  connect((state, props) => {
    const pickup = state.pickupQueue[props.gamemode];

    return {
      status: pickup.status,
      readyUp: pickup.readyUp,
    };
  }),
  injectSheet(ProgressBar.styles),
)(ProgressBar);
