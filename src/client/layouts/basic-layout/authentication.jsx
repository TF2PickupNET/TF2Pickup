import React, { PureComponent } from 'react';
import {
  Layout,
  Spinner,
} from 'materialize-react';
import cookie from 'js-cookie';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import sleep from 'sleep-promise';
import PropTypes from 'prop-types';

import app from '../../app';
import { addNotification } from '../../redux/notifications/actions';
import { pipe } from '../../../utils/functions';
import { openDialog } from '../../redux/dialog/actions';
import { loginUser } from '../../redux/user/actions';

/**
 * Authenticate the user. This also delays rendering the full app so it doesn't flash.
 *
 * @class
 */
class Authentication extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    addNotification: PropTypes.func.isRequired,
    classes: PropTypes.shape({ container: PropTypes.string.isRequired }).isRequired,
  };

  static styles = { container: { height: '100vh' } };

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
      await sleep(200);

      this.setState({ hasAuthenticated: true });
    }
  }

  /**
   * Authenticate with the token from the cookies.
   */
  authenticate = async () => {
    const token = cookie.get('feathers-jwt');

    if (token) {
      const { accessToken } = await app.authenticate({
        strategy: 'jwt',
        accessToken: token,
      });

      const verifiedToken = await app.passport.verifyJWT(accessToken);

      cookie.set('feathers-jwt', accessToken);

      app.set('userId', verifiedToken.id);

      const user = await app.service('users').get(verifiedToken.id);

      this.props.loginUser(user);

      if (user.name === null || user.settings.region === null || !user.hasAcceptedTheRules) {
        this.props.openDialog();
      }
    }
  };

  render() {
    if (this.state.hasAuthenticated) {
      return this.props.children;
    }

    return (
      <Layout
        mainAlign="center"
        crossAlign="center"
        className={this.props.classes.container}
      >
        <Spinner active />
      </Layout>
    );
  }
}

export default pipe(
  connect(null, (dispatch) => {
    return {
      addNotification(...args) {
        return dispatch(addNotification(...args));
      },

      loginUser(user) {
        return dispatch(loginUser(user));
      },

      openDialog() {
        return dispatch(openDialog('POST_USER_CREATION_DIALOG'));
      },
    };
  }),
  injectSheet(Authentication.styles),
)(Authentication);
