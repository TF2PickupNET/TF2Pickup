import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cookie from 'js-cookie';
import lockr from 'lockr';
import { connect } from 'react-redux';
import Aux from 'react-aux';
import injectSheet from 'react-jss';
import {
  Theme,
  Background,
  Button,
  Spinner,
  Layout,
} from 'materialize-react';

import app from '../../app';
import { isInBetaMode } from '../../../config/client';
import { addNotification } from '../../redux/notifications/actions';
import { pluck } from '../../../utils/functions';
import playSound from '../../utils/play-sound';

import Notifications from './notifications';
import Head from './head';
import BetaScreen from './beta-screen';
import NotificationRequester from './notification-requester';
import Dialogs from './dialogs';

/**
 * Render a basic layout which will try login with the token from a cookie and make sure
 * the windows view is wide enough.
 *
 * @class
 */
class BasicLayout extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      background: PropTypes.string.isRequired,
      loadingContainer: PropTypes.string.isRequired,
    }).isRequired,
    children: PropTypes.node.isRequired,
    addNotification: PropTypes.func.isRequired,
    userId: PropTypes.string,
    theme: PropTypes.string,
  };

  static defaultProps = {
    userId: null,
    theme: null,
  };

  static styles = {
    background: {
      width: '100vw',
      minHeight: '100vh',
    },

    loadingContainer: { height: '100vh' },
  };

  state = { hasAuthenticated: false };

  /**
   * Tries to login with the token from the cookies.
   */
  async componentWillMount() {
    app.on('reauthentication-error', this.authenticate);

    try {
      await this.authenticate();
    } catch (error) {
      this.props.addNotification(error.message);
    } finally {
      this.setState({ hasAuthenticated: true });
    }
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

  /**
   * Update the local storage when the user state changes.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.theme !== this.props.theme) {
      lockr.set('theme', nextProps.theme);
    }
  }

  hasPlayedSound = false;

  /**
   * Play the sound fix when the sound fix hasn't been played and the document is visible.
   */
  playSound = () => {
    if (!this.hasPlayedSound && !document.hidden) {
      playSound('notification', 0.01);
    }
  };

  /**
   * Authenticate with the token from the cookies.
   */
  authenticate = async () => {
    const token = cookie.get('feathers-jwt');

    if (token) {
      await app.authenticate({
        strategy: 'jwt',
        accessToken: token,
      });
    }
  };

  createAcceptCookiesHandler = closeSnackbar => () => {
    lockr.set('acceptsCookie', true);

    closeSnackbar();
  };

  /**
   * Calculate the current theme.
   *
   * @returns {String} - Returns the theme type.
   */
  getTheme() {
    return this.props.theme || lockr.get('theme') || 'light';
  }

  /**
   * Render the content when the user tried to authenticate.
   *
   * @returns {JSX} - Returns the content.
   */
  renderContent() {
    return isInBetaMode && !this.props.userId
      ? <BetaScreen />
      : this.props.children;
  }

  render() {
    return (
      <Theme type={this.getTheme()}>
        <Background className={this.props.classes.background}>
          <Dialogs />

          <Head />

          <Notifications />

          <NotificationRequester />

          {this.state.hasAuthenticated ? this.renderContent() : (
            <Layout
              mainAlign="center"
              crossAlign="center"
              className={this.props.classes.loadingContainer}
            >
              <Spinner active />
            </Layout>
          )}
        </Background>
      </Theme>
    );
  }
}

export default connect(
  (state) => {
    return {
      theme: pluck('settings.theme')(state.user),
      userId: state.user ? state.user.id : null,
    };
  },
  (dispatch) => {
    return { addNotification: (...args) => dispatch(addNotification(...args)) };
  },
)(injectSheet(BasicLayout.styles)(BasicLayout));

