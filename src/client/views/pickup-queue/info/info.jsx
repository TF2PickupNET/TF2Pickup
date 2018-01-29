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
} from 'materialize-react';
import gamemodes from '@tf2-pickup/configs/gamemodes';

import { pluck } from '../../../../utils/functions';
import {
  getPlayer,
  getGamemodeFromUrl,
  countPlayers,
} from '../../../../utils/pickup-queue';
import {
  closeDialog,
  openDialog,
} from '../../../redux/dialog/actions';

import ProgressBar from './progress-bar';
import PickupSounds from './pickup-sounds';
import PickupRedirect from './pickup-redirect';

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
      display: 'grid',
      padding: 8,
      marginLeft: 0,
      marginRight: 0,
      width: '100%',
      minHeight: 64,
      boxSizing: 'border-box',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gridTemplateRows: '48px',
      gridGap: '8px',

      [breakpoints.only('mobile')]: {
        minHeight: 120,
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '48px 48px',

        '& > .buttons': { order: 2 },
      },
    },

    item: {
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
      <Aux>
        <Card
          className={this.props.classes.container}
          data-gamemode={this.props.gamemode}
        >
          <span className={this.props.classes.item}>
            Status: {this.getStatus()}
          </span>

          <span className={`${this.props.classes.item} buttons`}>
            <Button disabled={!this.props.player}>
              Pre Ready
            </Button>
          </span>

          <span className={`${this.props.classes.item} buttons`}>
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
        </Card>

        <PickupSounds gamemode={this.props.gamemode} />

        <PickupRedirect />
      </Aux>
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

    const userId = pluck('user.id')(state);

    return {
      gamemode,
      status: pickup.status,
      userId,
      player: getPlayer(userId)(pickup),
      dialog: state.dialog,
      playerCount: countPlayers(gamemode)(pickup),
    };
  },
  (dispatch) => {
    return {
      openDialog: name => dispatch(openDialog(name)),
      closeDialog: () => dispatch(closeDialog()),
    };
  },
)(injectSheet(PickupInfo.styles)(PickupInfo));
