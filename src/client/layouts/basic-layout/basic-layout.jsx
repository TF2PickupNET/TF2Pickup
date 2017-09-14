import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cookie from 'js-cookie';
import lockr from 'lockr';
import { connect } from 'react-redux';
import {
  Theme,
  Background,
  Animations,
  Snackbar,
  Dialog,
  Button,
} from 'materialize-react';

import app from '../../app';
import { isInBetaMode } from '../../../config/client';
import Notifications from '../../components/notifications';
import { addNotification } from '../../redux/notifications/actions';
import NoConnectionDialog from '../../components/no-connection-dialog';
import PostLoginDialog from '../../components/post-login-dialog';

import Head from './head';
import BetaScreen from './beta-screen';

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
      this.cookieSnackbar.show();
    }
  }

  /**
   * Close the cookie snackbar and set the acceptsCookie value in the local storage to true,
   * so we don't show the snackbar again.
   */
  handleAcceptCookies = () => {
    lockr.set('acceptsCookie', true);

    this.cookieSnackbar.close();
  };

  render() {
    return (
      <Theme>
        <Dialog.Controller>
          <Snackbar.Controller>
            <Background>
              <Head />

              <Dialog.Container />

              <Animations />

              <Snackbar.Container />

              <NoConnectionDialog />

              <PostLoginDialog />

              <Notifications />

              <Snackbar
                autoCloseTimer={0}
                ref={(element) => { this.cookieSnackbar = element; }}
              >
                We are using cookies for a better experience.

                <Button onRelease={this.handleAcceptCookies}>
                  Ok
                </Button>
              </Snackbar>

              {isInBetaMode && !this.props.user ? (<BetaScreen />) : this.props.children}
            </Background>
          </Snackbar.Controller>
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

