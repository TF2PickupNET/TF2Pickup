import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cookie from 'js-cookie';
import lockr from 'lockr';
import { connect } from 'react-redux';
import Aux from 'react-aux';
import get from 'lodash.get';
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
import Notifications from '../../components/notifications';
import NoConnectionDialog from '../../components/no-connection-dialog';
import PostUserCreationDialog from '../../components/post-user-creation-dialog';

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
    user: PropTypes.shape({}),
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

  createAcceptCookiesHandler = closeSnackbar => () => {
    lockr.set('acceptsCookie', true);

    closeSnackbar();
  };

  render() {
    const themeType = get(this.props.user, 'settings.theme', 'light');

    return (
      <Theme type={themeType}>
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

