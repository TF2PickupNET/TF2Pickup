import React, {
  PropTypes,
  Component,
} from 'react';
import cookie from 'js-cookie';
import {
  Theme,
  Background,
} from 'tf2pickup-components';

import app from '/src/client/app';

export default class BasicLayout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    addNotification: PropTypes.func.isRequired,
  };

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
        this.props.addNotification('Something went wrong when trying to authenticate!');

        console.log(error);
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
    const content = this.state.browserWidth < 1200
      ? (
        <div>
          Your browser is to small
          <br /> Your browser needs to be atleast 1200px wide.
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
