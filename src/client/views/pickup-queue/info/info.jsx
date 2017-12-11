import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  Spinner,
  breakpoints,
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
import {
  closeDialog,
  openDialog,
} from '../../../redux/dialog/actions';

import ProgressBar from './progress-bar';

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
    openDialog: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
    pickup: PropTypes.shape({
      status: PropTypes.string.isRequired,
      gamemode: PropTypes.string.isRequired,
      classes: PropTypes.shape({}).isRequired,
    }),
    dialog: PropTypes.string,
    user: PropTypes.shape({}),
  };

  static defaultProps = {
    pickup: null,
    user: null,
    dialog: null,
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
   * If the user is currently logged in, we get the user data from the pickup classes.
   *
   * @param {Object} user - The current user object.
   * @param {Object} pickup - The current pickup.
   * @returns {(Boolean|Object)} - Returns either false when the player isn't in the pickup
   * or the object which is associated with him.
   */
  static getPlayerData(user, pickup) {
    if (user && pickup) {
      return getPlayer(user.id)(pickup.classes);
    }

    return false;
  }

  /**
   * Get whether or not the dialog should be opened.
   *
   * @param {Object} props - The props the state should be calculated from.
   * @returns {Boolean} - Returns whether or not the dialog should be opened.
   */
  static getDialogStatus(props) {
    const player = PickupInfo.getPlayerData(props.user, props.pickup);

    return props.pickup
      && props.pickup.status === 'ready-up'
      && player
      && !player.ready;
  }

  /**
   * Open the ready up dialog when needed.
   */
  componentWillReceiveProps(nextProps) {
    const nextStatus = PickupInfo.getDialogStatus(nextProps);
    const currentStatus = PickupInfo.getDialogStatus(this.props);

    if (nextStatus !== currentStatus) {
      if (nextStatus) {
        this.props.openDialog('READY_UP_DIALOG');
      } else if (this.props.dialog === 'READY_UP_DIALOG') {
        this.props.closeDialog();
      }
    }
  }

  /**
   * Get the pretty status to show.
   *
   * @returns {String} - Returns the pretty status.
   */
  getStatus() {
    switch (this.props.pickup.status) {
      case 'waiting': return 'Waiting';
      case 'ready-up': return 'Ready Up';
      case 'creating-teams': return 'Creating Teams';
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

  handleMapVoteButtonPress = () => this.props.openDialog('MAP_VOTE_DIALOG');

  render() {
    if (!this.props.pickup) {
      return (
        <Spinner active />
      );
    }

    const gamemodeInfo = gamemodes[this.props.pickup.gamemode];
    const playerData = PickupInfo.getPlayerData(this.props.user, this.props.pickup);

    return (
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
    );
  }
}

export default connect(
  (state) => {
    const gamemode = getGamemodeFromUrl(state.router.location.pathname);

    return {
      pickup: pluck(gamemode, null)(state.pickupQueue),
      user: state.user,
      dialog: state.dialog,
    };
  },
  (dispatch) => {
    return {
      openDialog: name => dispatch(openDialog(name)),
      closeDialog: () => dispatch(closeDialog()),
    };
  },
)(injectSheet(PickupInfo.styles)(PickupInfo));
