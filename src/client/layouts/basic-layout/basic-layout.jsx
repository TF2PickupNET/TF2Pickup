import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cookie from 'js-cookie';
import {
  Theme,
  Background,
  Animations,
  SnackbarController,
  SnackbarContainer,
} from 'materialize-react';

import app from '../../app';
import Notifications from '../../components/notifications';

/**
 * Render a basic layout which will try login with the token from a cookie and make sure
 * the windows view is wide enough.
 *
 * @class
 */
export default class BasicLayout extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    addNotification: PropTypes.func.isRequired,
  };

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
        this.props.addNotification(
          `Something went wrong while trying to authenticate! Error: ${error.message}`,
        );
      }
    }
  }

  render() {
    return (
      <Theme>
        <SnackbarController>
          <Background>
            <Animations />

            <Notifications />

            {this.props.children}

            <SnackbarContainer />
          </Background>
        </SnackbarController>
      </Theme>
    );
  }
}
