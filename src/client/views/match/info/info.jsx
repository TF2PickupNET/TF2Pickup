import React, { PureComponent } from 'react';
import {
  Card,
  colors,
} from 'materialize-react';
import injectSheet from 'react-jss';
import gamemodes from '@tf2-pickup/configs/gamemodes';
import regions from '@tf2-pickup/configs/regions';

import Date from '../../../components/date';
import maps from '../../../../config/maps';

class Info extends PureComponent {
  static styles = {
    card: {
      height: 64 * 2,
      display: 'grid',
      gridTemplateColumns: '3fr 2fr 2fr auto',
      gridTemplateRows: '64px',
    },

    imageContainer: {
      gridColumn: '4 / 5',
      gridRow: '1 / 3',
      height: 64 * 2,
      borderBottomRightRadius: 2,
      borderTopRightRadius: 2,
      position: 'relative',
    },

    image: {
      height: '100%',
      width: 'auto',
    },

    imageCaption: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: colors.blackSecondaryText,
      height: 32,
      lineHeight: '32px',
      fontSize: 16,
      textAlign: 'center',
    },

    item: {
      padding: '8px 16px',
      lineHeight: '48px',
      fontSize: 16,
    },
  };

  getStatus() {
    switch (this.props.pickup.status) {
      case 'setting-up-server': return 'Setting up server';
      case 'waiting-for-game-to-start': return 'Waiting for game to start';
      case 'game-is-live': return 'Game is live';
      case 'game-finished': return 'Game finished';
      case 'server-configuration-error': return 'Server configuration error';
      default: return 'Unknown status';
    }
  }

  getRegion() {
    return regions[this.props.pickup.region].fullName;
  }

  getGamemode() {
    return gamemodes[this.props.pickup.gamemode].display;
  }

  getDate() {
    switch (this.props.pickup.status) {
      case 'server-configuration-error':
      case 'waiting-for-game-to-start':
      case 'setting-up-server': return {
        name: 'Launched at',
        date: this.props.pickup.launchedOn,
      };
      case 'game-is-live': return {
        name: 'Game started at',
        date: this.props.pickup.startedOn,
      };
      case 'game-finished': return {
        name: 'Game started at',
        date: this.props.pickup.endedOn,
      };
      default: return {
        name: 'Unknown Status',
        date: null,
      };
    }
  }

  render() {
    const dateInfo = this.getDate();
    const mapInfo = maps[this.props.pickup.map];

    return (
      <Card className={this.props.classes.card}>
        <div className={this.props.classes.item}>
          Status: {this.getStatus()}
        </div>

        <div className={this.props.classes.item}>
          Region: {this.getRegion()}
        </div>

        <div className={this.props.classes.item}>
          Gamemode: {this.getGamemode()}
        </div>

        <div className={this.props.classes.item}>
          {dateInfo.name}: <Date date={dateInfo.date} />
        </div>

        <div className={this.props.classes.item}>
          Logs TF
        </div>

        <div className={this.props.classes.item}>
          Demos TF
        </div>

        <div className={this.props.classes.imageContainer}>
          <img
            src={`/assets/images/maps/${this.props.pickup.map}.jpg`}
            className={this.props.classes.image}
            alt="map picture"
          />

          <span className={this.props.classes.imageCaption}>
            {mapInfo.display}
          </span>
        </div>
      </Card>
    );
  }
}

export default injectSheet(Info.styles)(Info);
