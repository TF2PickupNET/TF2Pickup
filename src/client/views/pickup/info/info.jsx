import React, { PureComponent } from 'react';
import {
  Card,
  colors,
} from 'materialize-react';
import injectSheet from 'react-jss';
import gamemodes from '@tf2-pickup/configs/gamemodes';
import regions from '@tf2-pickup/configs/regions';
import PropTypes from 'prop-types';

import Date from '../../../components/date';
import maps from '../../../maps';

/**
 * The info for the pickup.
 *
 * @class
 */
class Info extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      card: PropTypes.string.isRequired,
      imageContainer: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      imageCaption: PropTypes.string.isRequired,
      item: PropTypes.string.isRequired,
    }).isRequired,
    pickup: PropTypes.shape({
      status: PropTypes.string.isRequired,
      region: PropTypes.string.isRequired,
      gamemode: PropTypes.string.isRequired,
      launchedOn: PropTypes.string,
      startedOn: PropTypes.string,
      endedOn: PropTypes.string,
      map: PropTypes.string.isRequired,
    }).isRequired,
  };

  static styles = {
    card: {
      height: 64 * 2,
      display: 'grid',
      gridTemplateColumns: '3fr 2fr 2fr auto',
      gridTemplateRows: '64px',
      margin: 0,
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

  /**
   * Get the transformed status to display.
   *
   * @returns {String} - Returns the status.
   */
  getStatus() {
    switch (this.props.pickup.status) {
      case 'setting-up-server': return 'Setting up server';
      case 'waiting-for-game-to-start': return 'Waiting for game to start';
      case 'game-is-live': return 'Game is live';
      case 'game-finished': return 'Game finished';
      case 'server-configuration-error': return 'Server configuration error';
      case 'server-reservation-error': return 'Server reservation error';
      default: return 'Unknown status';
    }
  }

  /**
   * Get the fullname of the region.
   *
   * @returns {String} - Returns the name.
   */
  getRegion() {
    return regions[this.props.pickup.region].fullName;
  }

  /**
   * Get the display for the gamemode.
   *
   * @returns {String} - Returns the display for the gamemode.
   */
  getGamemode() {
    return gamemodes[this.props.pickup.gamemode].display;
  }

  /**
   * Get the date based on the current status.
   *
   * @returns {Date} - Returns the date.
   */
  getDate() {
    switch (this.props.pickup.status) {
      case 'server-configuration-error':
      case 'server-reservation-error':
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
        name: 'Game finished at',
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
            src={maps[this.props.pickup.map].image}
            className={this.props.classes.image}
            alt="map"
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
