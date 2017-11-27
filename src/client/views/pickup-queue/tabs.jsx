import React, { PureComponent } from 'react';
import {
  Tabs,
  Tab,
  breakpoints,
  Typography,
} from 'materialize-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import injectSheet from 'react-jss';
import gamemodes from '@tf2-pickup/configs/gamemodes';

import {
  pipe,
  map,
  filter,
} from '../../../utils/functions';
import {
  getPlayer,
  getGamemodeFromUrl,
  countPlayers,
} from '../../../utils/pickup';
import createNotification from '../../utils/create-notification';
import app from '../../app';

/**
 * Render the tabs for the different gamemodes.
 *
 * @class
 */
class GamemodeTabs extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      tabs: PropTypes.string.isRequired,
      tab: PropTypes.string.isRequired,
      playerCount: PropTypes.string.isRequired,
    }).isRequired,
    gamemode: PropTypes.oneOf(Object.keys(gamemodes)).isRequired,
    pickups: PropTypes.shape({}),
    redirect: PropTypes.func.isRequired,
    user: PropTypes.shape({ id: PropTypes.string }),
  };

  static defaultProps = {
    pickups: null,
    user: null,
  };

  static styles = {
    tabs: {
      display: 'inline-flex',
      flexWrap: 'nowrap',
      marginBottom: 8,

      [breakpoints.down('mobile')]: { display: 'none' },
    },

    tab: { '& > .tab--content': { textTransform: 'none' } },

    playerCount: {
      padding: '0 4px',
      lineHeight: 1,
    },
  };

  /**
   * Add an event listener to the redirect event.
   */
  componentWillMount() {
    app.service('pickup').on('redirect', this.handleRedirect);
  }

  /**
   * Switch the tab when one of the pickups changes into ready-up mode.
   */
  componentWillReceiveProps(nextProps) {
    if (!this.props.pickups) {
      return;
    }

    pipe(
      Object.values,
      map(pickup => Object.assign({}, pickup, { oldPickup: this.props.pickups[pickup.gamemode] })),
      filter(pickup => pickup.status === 'ready-up' && pickup.oldPickup.status === 'waiting'),
      filter(pickup => getPlayer(this.props.user.id)(pickup.classes)),
      map((pickup) => {
        this.props.redirect(`/${pickup.gamemode}`);

        return createNotification('Ready Up', {
          timeout: gamemodes[pickup.gamemode].readyUpTime * 1000,
          body: `Your ${gamemodes[pickup.gamemode].display} is ready`,
        });
      }),
    )(nextProps.pickups);
  }

  /**
   * Remove the event listener for the redirect.
   */
  componentWillUnmount() {
    app
      .service('pickup')
      .removeListener('redirect', this.handleRedirect);
  }

  /**
   * Count the players for the gamemode.
   *
   * @param {String} gamemode - The gamemodes name.
   * @returns {Number} - The players count.
   */
  countPlayers(gamemode) {
    if (!this.props.pickups || !this.props.pickups[gamemode]) {
      return 0;
    }

    return countPlayers(gamemode)(this.props.pickups[gamemode].classes);
  }

  /**
   * Redirect the user to the match.
   *
   * @param {Object} data - The data from the server.
   */
  handleRedirect = (data) => {
    if (this.props.user && data.users.includes(this.props.user.id)) {
      window.location = data.url;
    }
  };

  /**
   * Redirect the user when he clicks one of the tabs.
   *
   * @param {String} gamemode - The gamemode to redirect to.
   */
  handleChange = (gamemode) => {
    this.props.redirect(`/${gamemode}`);
  };

  /**
   * Render each of the gamemode tabs.
   *
   * @returns {JSX[]} - Returns the tabs children.
   */
  renderTabs() {
    return pipe(
      Object.values,
      map(gamemode => (
        <Tab
          key={gamemode.name}
          name={gamemode.name}
          className={this.props.classes.tab}
        >
          {gamemode.display}

          <Typography
            secondary
            typography="body1"
            className={this.props.classes.playerCount}
          >
            ({this.countPlayers(gamemode.name)} / {gamemode.maxPlayers})
          </Typography>
        </Tab>
      )),
    )(gamemodes);
  }

  render() {
    return (
      <Tabs
        tab={this.props.gamemode}
        className={this.props.classes.tabs}
        onChange={this.handleChange}
      >
        {this.renderTabs()}
      </Tabs>
    );
  }
}

export default connect(
  (state) => {
    return {
      user: state.user,
      pickups: state.pickupQueue,
      gamemode: getGamemodeFromUrl(state.router.location.pathname),
    };
  },
  (dispatch) => {
    return { redirect: url => dispatch(push(url)) };
  },
)(injectSheet(GamemodeTabs.styles)(GamemodeTabs));
