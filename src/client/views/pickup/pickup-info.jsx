import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import classnames from 'classnames';
import { differenceInMilliseconds } from 'date-fns';
import {
  Button,
  Card,
  breakpoints,
  Progress,
} from 'materialize-react';

import gamemodes from '@tf2-pickup/configs/gamemodes';

class GamemodeInfo extends PureComponent {
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

  interval = null;

  componentDidMount() {
    if (this.props.pickup.status === 'ready-up') {
      this.interval = setInterval(this.calculateProgress, 180);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.pickup.status === 'ready-up' && prevProps.pickup.status !== 'ready-up') {
      this.interval = setInterval(this.calculateProgress, 150);
    }
  }

  calculateProgress = (props = this.props) => {
    if (props.pickup.status !== 'ready-up') {
      this.setState({ progress: 0 });

      return window.clearInterval(this.interval);
    }
creating
    return this.setState({ progress: differenceInMilliseconds(new Date(), props.pickup.readyUp) });
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

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

export default injectSheet(GamemodeInfo.styles)(GamemodeInfo);
