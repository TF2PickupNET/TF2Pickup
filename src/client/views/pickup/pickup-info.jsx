import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import classnames from 'classnames';
import moment from 'moment';
import {
  Button,
  Card,
  breakpoints,
  Progress,
} from 'materialize-react';

import gamemodes from '@tf2-pickup/configs/gamemodes';

import statuses from '@tf2-pickup/configs/pickup-status';

class GamemodeInfo extends PureComponent {
  static styles = {
    container: {
      display: 'flex',
      height: 64,
      padding: '8px 0',
      marginBottom: 24,
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative',

      [breakpoints.up('desktop')]: {
        '&[data-gamemode="6v6"]': { maxWidth: 400 * 4 + 3 * 16 },

        '&[data-gamemode="9v9"]': { maxWidth: 400 * 3 + 2 * 16 },

        '&[data-gamemode="bball"], &[data-gamemode="ultiduo"]': { maxWidth: 400 * 2 + 16 },
      },
    },

    item: {
      padding: '0 16px',
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.pickup.status === 'ready-up' && this.props.pickup.status !== 'ready-up') {
      this.calculateProgress(nextProps);

      this.readyUp = moment(nextProps.pickup.readyUp);
      this.readyUpTime = gamemodes[nextProps.pickup.gamemode].readyUpTime * 1000;
    }
  }

  calculateProgress(props = this.props) {
    if (props.pickup.status !== 'ready-up') {
      return this.setState({ progress: 0 });
    }

    const current = moment();
    const diff = current.diff(this.readyUp);

    return this.setState({ progress: diff / this.readyUpTime * 100 }, () => {
      setTimeout(() => this.calculateProgress(), 140);
    });
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
          Status: {statuses[pickup.status].display}
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
          progress={this.state.progress}
        />
      </Card>
    );
  }
}

export default injectSheet(GamemodeInfo.styles)(GamemodeInfo);
