import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cookie from 'js-cookie';
import lockr from 'lockr';
import { connect } from 'react-redux';
import Aux from 'react-aux';
import {
  Theme,
  Background,
  Animations,
  Dialog,
  Button,
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
    children: PropTypes.node.isRequired,
    addNotification: PropTypes.func.isRequired,
    user: PropTypes.shape({ settings: PropTypes.shape({ theme: PropTypes.string }) }),
  };

  static defaultProps = { user: null };

  /**
   * Tries to login with the token from the cookies.
   */
  async componentWillMount() {
    const token = cookie.get('feathers-jwt');

    if (token) {
      try {
        await app.authenticate({
          strategy: 'jwt',
          accessToken: token,
        });
      } catch (error) {
        this.props.addNotification(error.message);
      }
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
      return pluck('settings.theme')(this.props.user);
    }

    return lockr.get('theme') || 'light';
  }

  render() {
    return (
      <Theme type={this.getTheme()}>
        <Dialog.Controller>
          <Background>
            <Head />

            <Dialog.Container />

            <Notifications />

            <Animations />

            <NoConnectionDialog />

            <PostUserCreationDialog />

            <NotificationRequester />

            {isInBetaMode && !this.props.user ? <BetaScreen /> : this.props.children}
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
)(BasicLayout);

