import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import lockr from 'lockr';
import { connect } from 'react-redux';
import gamemodes from '@tf2-pickup/configs/gamemodes';
import injectSheet from 'react-jss';
import Aux from 'react-aux';
import { breakpoints } from 'materialize-react';

import { getGamemodeFromUrl } from '../../../utils/pickup';
import { pluck } from '../../../utils/functions';

import Tabs from './tabs';
import Info from './info';
import Classes from './classes';
import OnlineUsers from './online-users';
import Chat from './chat';

/**
 * The view for the pickup page.
 *
 * @class
 */
class View extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      container: PropTypes.string.isRequired,
      chatContainer: PropTypes.string.isRequired,
    }).isRequired,
    gamemode: PropTypes.string.isRequired,
  };

  static styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      height: 'auto',

      [breakpoints.down('tablet')]: { width: '100%' },
    },

    chatContainer: {
      display: 'grid',
      gridTemplateColumns: '3fr 1fr',
      gridGap: '16px',
      gridTemplateRows: '380px',

      [breakpoints.only('tablet')]: { gridTemplateColumns: '2fr 1fr' },

      [breakpoints.only('mobile')]: {
        gridTemplateColumns: '1fr',
        gridTemplateRows: '380px 380px',
      },
    },
  };

  /**
   * Set the last gamemode property in the local storage on mount.
   */
  componentWillUnmount() {
    lockr.set('lastGamemode', this.props.gamemode);
  }

  /**
   * Compute the current title for the gamemode.
   *
   * @returns {String} - Returns the title.
   */
  getTitle() {
    return pluck(`${this.props.gamemode}.display`, '')(gamemodes);
  }

  render() {
    return (
      <Aux>
        <Helmet>
          <title>
            {this.getTitle()}
          </title>
        </Helmet>

        <Tabs />

        <div className={this.props.classes.container}>
          <Info />

          <Classes />

          <div className={this.props.classes.chatContainer}>
            <Chat />

            <OnlineUsers />
          </div>
        </div>
      </Aux>
    );
  }
}

export default connect(
  (state) => {
    return { gamemode: getGamemodeFromUrl(state.router.location.pathname) };
  },
)(injectSheet(View.styles)(View));
