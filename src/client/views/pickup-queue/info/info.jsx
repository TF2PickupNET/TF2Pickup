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
import PickupSounds from './pickup-sounds';

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
    dialog: PropTypes.string,
    status: PropTypes.string,
    playerCount: PropTypes.number,
    gamemode: PropTypes.string,
    player: PropTypes.shape({}),
  };

  static defaultProps = {
    status: null,
    playerCount: 0,
    gamemode: null,
    player: null,
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
   * Get whether or not the dialog should be opened.
   *
   * @param {Object} props - The props the state should be calculated from.
   * @returns {Boolean} - Returns whether or not the dialog should be opened.
   */
  static getDialogStatus(props) {
    return props.status === 'ready-up'
      && props.player
      && !props.player.ready;
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
    switch (this.props.status) {
      case 'waiting': return 'Waiting';
      case 'ready-up': return 'Ready Up';
      case 'creating-teams': return 'Creating Teams';
      default: return 'Unknown status';
    }
  }

  handleMapVoteButtonPress = () => this.props.openDialog('MAP_VOTE_DIALOG');

  render() {
    if (!this.props.status) {
      return (
        <Spinner active />
      );
    }

    const gamemodeInfo = gamemodes[this.props.gamemode];

    return (
      <Card
        className={this.props.classes.container}
        data-gamemode={this.props.gamemode}
      >
        <span className={this.props.classes.item}>
          Status: {this.getStatus()}
        </span>

        <span className={this.props.classes.item}>
          <Button disabled={!this.props.player}>
            Pre Ready
          </Button>
        </span>

        <span className={this.props.classes.item}>
          <Button
            disabled={!this.props.player}
            onPress={this.handleMapVoteButtonPress}
          >
            Vote for map
          </Button>
        </span>

        <span className={this.props.classes.item}>
          Players: {this.props.playerCount} / {gamemodeInfo.maxPlayers}
        </span>

        <ProgressBar gamemode={this.props.gamemode} />

        <PickupSounds gamemode={this.props.gamemode} />
      </Card>
    );
  }
}

export default connect(
  (state) => {
    const gamemode = getGamemodeFromUrl(state.router.location.pathname);
    const pickup = pluck(gamemode, null)(state.pickupQueue);

    if (!pickup) {
      return {};
    }

    const gamemodeInfo = gamemodes[gamemode];
    const userId = state.user ? state.user.id : null;
    const classes = pickup.classes || {};

    return {
      gamemode,
      status: pickup.status,
      userId,
      player: getPlayer(userId)(classes),
      dialog: state.dialog,
      playerCounnt: pipe(
        mapObject((players, className) => Math.min(players.length, gamemodeInfo.slots[className])),
        Object.values,
        reduce((total, count) => total + count, 0),
      )(classes),
    };
  },
  (dispatch) => {
    return {
      openDialog: name => dispatch(openDialog(name)),
      closeDialog: () => dispatch(closeDialog()),
    };
  },
)(injectSheet(PickupInfo.styles)(PickupInfo));
