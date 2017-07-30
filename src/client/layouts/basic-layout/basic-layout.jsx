import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cookie from 'js-cookie';
import {
  Theme,
  Background,
} from 'materialize-react';

import app from '../../app';

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

  static minWidthView = 1200;

  state = { browserWidth: window.innerWidth };

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

  /**
   * Add an event handler to the resize event so we can update the state when the user changes
   * the windows size.
   */
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  /**
   * Remove the event listener in case this component unmounts.
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  /**
   * Change the state when the browser resizes.
   */
  handleResize = () => {
    this.setState({ browserWidth: window.innerWidth });
  };

  render() {
    const content = this.state.browserWidth < BasicLayout.minWidthView ? (
      <div>
        Your browser is to small
        <br /> Your browser needs to be atleast {BasicLayout.minWidthView}px wide.
      </div>
    ) : this.props.children;

    return (
      <Theme>
        <Background>
          {content}
        </Background>
      </Theme>
    );
  }
}
