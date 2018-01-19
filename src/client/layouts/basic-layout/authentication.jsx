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
      await sleep(100);

      this.setState({ hasAuthenticated: true });
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
  injectSheet(Authentication.styles),
  connect(null, (dispatch) => {
    return {
      addNotification(...args) {
        return dispatch(addNotification(...args));
      },
    };
  }),
)(Authentication);
