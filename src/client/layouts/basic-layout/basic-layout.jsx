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
  Animations,
  Dialog,
  Button,
  Spinner,
  Layout,
} from 'materialize-react';

import app from '../../app';
import { isInBetaMode } from '../../../config/client';
import { addNotification } from '../../redux/notifications/actions';
import { pluck } from '../../../utils/functions';

import NoConnectionDialog from './no-connection-dialog';
import PostUserCreationDialog from './post-user-creation-dialog';
import Notifications from './notifications';
import Head from './head';
import BetaScreen from './beta-screen';
import NotificationRequester from './notification-requester';

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
    user: PropTypes.shape({ settings: PropTypes.shape({ theme: PropTypes.string }) }),
  };

  static defaultProps = { user: null };

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
    const acceptsCookie = lockr.get('acceptsCookie');

    if (!acceptsCookie) {
      this.props.addNotification(
        ({ closeSnackbar }) => (
          <Aux>
            We are using cookies for a better experience.

            <Button onRelease={this.createAcceptCookiesHandler(closeSnackbar)}>
              Ok
            </Button>
          </Aux>
        ),
        { autoCloseTimer: 0 },
      );
    }
  }

  /**
   * Update the local storage when the user state changes.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user && nextProps.user) {
      lockr.set('theme', nextProps.user.settings.theme);
    }
  }

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
    if (this.props.user) {
      return pluck('settings.theme', 'light')(this.props.user);
    }

    return lockr.get('theme') || 'light';
  }

  /**
   * Render the content when the user tried to authenticate.
   *
   * @returns {JSX} - Returns the content.
   */
  renderContent() {
    return isInBetaMode && !this.props.user
      ? <BetaScreen />
      : this.props.children;
  }

  render() {
    return (
      <Theme type={this.getTheme()}>
        <Dialog.Controller>
          <Background className={this.props.classes.background}>
            <Head />

            <Dialog.Container />

            <Notifications />

            <Animations />

            <NoConnectionDialog />

            <PostUserCreationDialog />

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
        </Dialog.Controller>
      </Theme>
    );
  }
}

export default connect(
  (state) => {
    return { user: state.user };
  },
  (dispatch) => {
    return { addNotification: (...args) => dispatch(addNotification(...args)) };
  },
)(injectSheet(BasicLayout.styles)(BasicLayout));

