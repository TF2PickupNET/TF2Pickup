// @flow

import React, { type Node } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import cookie from 'js-cookie';
import {
  Row,
  Col,
  Progress,
  message,
} from 'antd';
import {
  type Config,
  type User,
  type UserSettings,
  type UserProfile,
} from '@tf2pickup/types';

import app from '../../app';
import { setConfig } from '../../store/config/actions';
import { loginUser } from '../../store/user/actions';
import { setSettings } from '../../store/settings/actions';
import { setProfile } from '../../store/profile/actions';

type Props = {
  classes: {
    container: string,
    text: string,
  },
  children: Node,
  setConfig(config: Config): void,
  loginUser(user: User): void,
  setSettings(settings: UserSettings): void,
  setProfile(profile: UserProfile): void,
};
type State = {
  isLoading: boolean,
  loadingPercentage: number,
  loadingText: string,
  error: string | null,
};

const styles = {
  container: { minHeight: '100vh' },

  text: { textAlign: 'center' },
};

class LoadingScreen extends React.PureComponent<Props, State> {
  state = {
    isLoading: true,
    loadingPercentage: 10,
    loadingText: 'Loading configuration',
    error: null,
  };

  componentDidMount() {
    this.steps[0]();
  }

  currentStep = 0;

  loadConfiguration = async () => {
    try {
      const config = await app.service('configuration').get(null);

      this.props.setConfig(config);

      this.setState({ loadingPercentage: 30 });
    } catch (error) {
      this.setState({ error: `Couldn't load config file. ${error.message}` });
    }
  };

  authenticate = async () => {
    const token = cookie.get('feathers-jwt');

    this.setState({ loadingText: 'Authenticating' });

    if (token) {
      try {
        const { accessToken } = await app.authenticate({
          strategy: 'jwt',
          accessToken: token,
        });
        const verifiedToken = await app.passport.verifyJWT(accessToken);

        cookie.set('feathers-jwt', accessToken);
        app.set('userId', verifiedToken.id);

        this.setState({ loadingPercentage: 45 });
      } catch (error) {
        message.warn(`Couldn't authenticate. ${error.message}`);

        this.setState({ loadingPercentage: 100 });
      }
    } else {
      message.warn('Couldn\'t authenticate');

      this.setState({ loadingPercentage: 100 });
    }
  };

  fetchUser = async () => {
    const userId = app.get('userId');

    this.setState({ loadingText: 'Fetching user' });

    try {
      const user = await app.service('users').get(userId);

      this.props.loginUser(user);

      this.setState({ loadingPercentage: 60 });
    } catch (error) {
      message.warn(`Couldn't fetch user! ${error.message}`);
    }
  };

  fetchSettings = async () => {
    const userId = app.get('userId');

    this.setState({ loadingText: 'Fetching settings' });

    try {
      const settings = await app.service('user-settings').get(userId);

      this.props.setSettings(settings);

      this.setState({ loadingPercentage: 80 });
    } catch (error) {
      this.setState({ error: `Couldn't fetch settings! ${error.message}` });
    }
  };

  fetchProfile = async () => {
    const userId = app.get('userId');

    this.setState({ loadingText: 'Fetching profile' });

    try {
      const profile = await app.service('user-profile').get(userId);

      this.props.setProfile(profile);

      this.setState({ loadingPercentage: 100 });
    } catch (error) {
      this.setState({ error: `Couldn't fetch profile! ${error.message}` });
    }
  };

  steps = [
    this.loadConfiguration,
    this.authenticate,
    this.fetchUser,
    this.fetchSettings,
    this.fetchProfile,
  ];

  handleTransitionEnd = () => {
    if (this.state.loadingPercentage === 100) {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 350);
    } else {
      this.currentStep += 1;

      if (this.steps.length > this.currentStep) {
        this.steps[this.currentStep]();
      }
    }
  };

  renderLoadingScreen() {
    return (
      <Row
        type="flex"
        justify="center"
        align="middle"
        className={this.props.classes.container}
      >
        <Col
          xs={20}
          md={12}
          lg={8}
        >
          <Progress
            percent={this.state.loadingPercentage}
            status={this.state.error === null ? 'active' : 'exception'}
            onTransitionEnd={this.handleTransitionEnd}
          />

          <p className={this.props.classes.text}>
            {this.state.error === null ? this.state.loadingText : this.state.error}
          </p>
        </Col>
      </Row>
    );
  }

  render() {
    return this.state.isLoading ? this.renderLoadingScreen() : this.props.children;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setConfig(config) {
      return dispatch(setConfig(config));
    },
    loginUser(user) {
      return dispatch(loginUser(user));
    },
    setSettings(settings) {
      return dispatch(setSettings(settings));
    },
    setProfile(profile) {
      return dispatch(setProfile(profile));
    },
  };
}

export default injectSheet(styles)(
  connect(null, mapDispatchToProps)(LoadingScreen)
);