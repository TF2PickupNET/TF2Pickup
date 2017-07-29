import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cookie from 'js-cookie';
import {
  Theme,
  Background,
} from 'materialize-react';

import app from '../../app';

export default class BasicLayout extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    addNotification: PropTypes.func.isRequired,
  };

  static minWidthView = 1200;

  state = { browserWidth: window.innerWidth };

  async componentWillMount() {
    const token = cookie.get('feathers-jwt');

    if (token) {
      try {
        await app.authenticate({
          strategy: 'jwt',
          accessToken: token,
        });
      } catch (error) {
        this.props.addNotification('Something went wrong while trying to authenticate!');
      }
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

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
