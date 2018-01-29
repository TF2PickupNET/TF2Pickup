import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import lockr from 'lockr';
import { gamemodes } from '@tf2-pickup/config';
import injectSheet from 'react-jss';
import Aux from 'react-aux';
import { breakpoints } from 'materialize-react';
import { pluck } from '@tf2-pickup/utils';

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
    match: PropTypes.shape({ params: PropTypes.shape({}).isRequired }).isRequired,
  };

  static styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      height: 'auto',

      width: '100%',

      [breakpoints.only('desktop')]: {
        '&.gamemode-9v9, &.gamemode-6v6': { maxWidth: 360 * 3 + 2 * 16 },

        '&.gamemode-ultiduo, &.gamemode-bball': { maxWidth: 400 * 2 + 16 },
      },
    },

    chatContainer: {
      display: 'grid',
      gridTemplateColumns: '3fr 1fr',
      gridGap: '16px',
      gridTemplateRows: '380px',

      [breakpoints.only('tablet')]: { gridTemplateColumns: '2fr 1fr' },

      [breakpoints.only('mobile')]: {
        gridTemplateColumns: '1fr',
        gridTemplateRows: '400px 400px',
      },
    },
  };

  /**
   * Set the last gamemode property in the local storage on mount.
   */
  componentWillUnmount() {
    lockr.set('lastGamemode', this.props.match.params[0]);
  }

  render() {
    const gamemode = this.props.match.params[0];

    return (
      <Aux>
        <Helmet>
          <title>
            {pluck(`${gamemode}.display`, '')(gamemodes)}
          </title>
        </Helmet>

        <Tabs />

        <div
          className={classnames(
            this.props.classes.container,
            `gamemode-${gamemode}`,
          )}
        >
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

export default injectSheet(View.styles)(View);
