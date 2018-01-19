import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import lockr from 'lockr';
import { connect } from 'react-redux';
import Aux from 'react-aux';
import injectSheet from 'react-jss';
import {
  Background,
  Button,
} from 'materialize-react';

import { addNotification } from '../../redux/notifications/actions';
import {
  pipe,
  pluck,
} from '../../../utils/functions';
import playSound from '../../utils/play-sound';

import Notifications from './notifications';
import Head from './head';
import BetaScreen from './beta-screen';
import NotificationRequester from './notification-requester';
import Dialogs from './dialogs';
import Authentication from './authentication';

/**
 * Render a basic layout which will try login with the token from a cookie and make sure
 * the windows view is wide enough.
 *
 * @class
 */
class BasicLayout extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({ background: PropTypes.string.isRequired }).isRequired,
    children: PropTypes.node.isRequired,
    addNotification: PropTypes.func.isRequired,
  };

  /**
   * The styles for the component.
   *
   * @param {Object} theme - The theme provided by Jss.
   * @returns {Object} - Returns the styles.
   */
  static styles(theme) {
    return {
      background: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '100vw',
        maxWidth: '100vw',
        minHeight: '100vh',

        '& .scrollbar': {
          '&::-webkit-scrollbar': { width: 10 },

          '&::-webkit-scrollbar-track': { background: 'transparent' },

          '&::-webkit-scrollbar-thumb': { background: theme.dividerColor },

          '&::-moz-scrollbar': { width: 10 },

          '&::-moz-scrollbar-track': { background: 'transparent' },

          '&::-moz-scrollbar-thumb': { background: theme.dividerColor },
        },
      },
    };
  }

  /**
   * Show a snackbar that we use cookies when the user hasn't accepted them yet.
   */
  componentDidMount() {
    if (!lockr.get('acceptsCookie')) {
      this.props.addNotification(
        ({ closeSnackbar }) => (
          <Aux>
            We are using cookies for a better experience.

            <Button onPress={this.createAcceptCookiesHandler(closeSnackbar)}>
              Ok
            </Button>
          </Aux>
        ),
        { autoCloseTimer: 0 },
      );
    }

    this.playSound();

    document.addEventListener('visibilitychange', this.playSound);
  }

  hasPlayedSound = false;

  /**
   * Play the sound fix when the sound fix hasn't been played and the document is visible.
   */
  playSound = () => {
    if (!this.hasPlayedSound && !document.hidden) {
      playSound('notification', 0.01);

      document.removeEventListener('visibilitychange', this.playSound);
    }
  };

  createAcceptCookiesHandler = closeSnackbar => () => {
    lockr.set('acceptsCookie', true);

    closeSnackbar();
  };

  render() {
    return (
      <Background className={this.props.classes.background}>
        <Dialogs />

        <Head />

        <Notifications />

        <NotificationRequester />

        <Authentication>
          <BetaScreen>
            {this.props.children}
          </BetaScreen>
        </Authentication>
      </Background>
    );
  }
}

export default pipe(
  connect(
    (state) => {
      return { userId: pluck('id')(state.user) };
    },
    (dispatch) => {
      return { addNotification: (...args) => dispatch(addNotification(...args)) };
    },
  ),
  injectSheet(BasicLayout.styles),
)(BasicLayout);
