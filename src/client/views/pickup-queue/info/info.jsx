import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Aux from 'react-aux';
import {
  Button,
  Card,
  Spinner,
  breakpoints,
  Dialog,
} from 'materialize-react';
import gamemodes from '@tf2-pickup/configs/gamemodes';

import {
  pipe,
  mapObject,
  reduce,
  pluck,
} from '../../../../utils/functions';
import {
  getPlayer,
  getGamemodeFromUrl,
} from '../../../../utils/pickup';

import ReadyUpDialog from './ready-up-dialog';
import ProgressBar from './progress-bar';
import MapVoteDialog from './map-vote-dialog';

/**
 * A component which renders info about the current pickup.
 *
 * @class
 */
class PickupInfo extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      container: PropTypes.string.isRequired,
      item: PropTypes.string.isRequired,
    }).isRequired,
    pickup: PropTypes.shape({
      status: PropTypes.string.isRequired,
      gamemode: PropTypes.string.isRequired,
      classes: PropTypes.shape({}).isRequired,
    }),
    user: PropTypes.shape({ id: PropTypes.string }),
  };

  static defaultProps = {
    pickup: null,
    user: null,
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

  /**
   * Count how many players are in the pickup.
   *
   * @returns {Number} - Returns the count.
   */
  getPlayerCount() {
    return pipe(
      mapObject((players, className) => {
        const max = gamemodes[this.props.pickup.gamemode].slots[className];

        return Math.min(players.length, max);
      }),
      Object.values,
      reduce((total, count) => total + count, 0),
    )(this.props.pickup.classes);
  }

  /**
   * If the user is currently logged in, we get the user data from the pickup classes.
   *
   * @returns {(Boolean|Object)} - Returns either false when the player isn't in the pickup
   * or the object which is associated with him.
   */
  getPlayerData() {
    if (this.props.user) {
      return getPlayer(this.props.user.id)(this.props.pickup.classes);
    }

    return false;
  }

  handleMapVoteButtonPress = () => this.mapVoteDialog.open();

  render() {
    if (!this.props.pickup) {
      return (
        <Spinner active />
      );
    }

    const gamemodeInfo = gamemodes[this.props.pickup.gamemode];
    const playerData = this.getPlayerData();

    return (
      <Aux>
        <Card
          className={this.props.classes.container}
          data-gamemode={this.props.pickup.gamemode}
        >
          <span className={this.props.classes.item}>
            Status: {this.getStatus()}
          </span>

          <span className={this.props.classes.item}>
            <Button disabled={!playerData}>
              Pre Ready
            </Button>
          </span>

          <span className={this.props.classes.item}>
            <Button
              disabled={!playerData}
              onPress={this.handleMapVoteButtonPress}
            >
              Vote for map
            </Button>
          </span>

          <span className={this.props.classes.item}>
            Players: {this.getPlayerCount()} / {gamemodeInfo.maxPlayers}
          </span>

          <ProgressBar pickup={this.props.pickup} />
        </Card>

        <Dialog
          closeOnOutsideClick
          ref={(element) => { this.mapVoteDialog = element; }}
          component={MapVoteDialog}
        />

        {playerData ? (
          <ReadyUpDialog
            pickup={this.props.pickup}
            player={playerData}
          />
        ) : null}
      </Aux>
    );
  }
}

export default connect(
  (state) => {
    const gamemode = getGamemodeFromUrl(state.router.location.pathname);

    return {
      pickup: pluck(gamemode, null)(state.pickupQueue),
      user: state.user,
    };
  },
)(injectSheet(PickupInfo.styles)(PickupInfo));
