// @flow

import React, { type Node } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Progress,
  message,
} from 'antd';
import Helmet from 'react-helmet';

import {
  type Config,
  type User,
  type UserSettings,
  type UserProfile,
} from '../../../types';
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

  currentStep = 0;

  componentDidMount() {
    this.runStep();
  }

  runStep() {
    switch (this.currentStep) {
      case 0: return this.loadConfiguration();
      case 1: return this.authenticate();
      case 2: return this.fetchUser();
      case 3: return this.fetchSettings();
      case 4: return this.fetchProfile();
      default: return null;
    }
  }

  async loadConfiguration() {
    try {
      const config = await app.service('configuration').get('config');

      this.props.setConfig(config);

      this.setState({ loadingPercentage: 30 });
    } catch (error) {
      this.setState({ error: `Couldn't load config. ${error.message}` });
    }
  }

  async authenticate() {
    this.setState({ loadingText: 'Authenticating' });

    try {
      await app.authenticate();

      this.setState({ loadingPercentage: 45 });
    } catch (error) {
      message.warn(`Couldn't authenticate. ${error.message}`);

      this.setState({ loadingPercentage: 100 });
    }
  }

  async fetchUser() {
    const userId = app.get('userId');

    if (userId === null) {
      message.warn('Couldn\'t authenticate.');

      this.setState({ loadingPercentage: 100 });

      return;
    }

    this.setState({ loadingText: 'Fetching user' });

    try {
      const user = await app.service('users').get(userId);

      this.props.loginUser(user);

      this.setState({ loadingPercentage: 60 });
    } catch (error) {
      message.warn(`Couldn't fetch user! ${error.message}`);
    }
  }

  async fetchSettings() {
    const userId = app.get('userId');

    if (userId === null) {
      message.warn('Couldn\'t authenticate.');

      this.setState({ loadingPercentage: 100 });

      return;
    }

    this.setState({ loadingText: 'Fetching settings' });

    try {
      const settings = await app.service('user-settings').get(userId);

      this.props.setSettings(settings);

      this.setState({ loadingPercentage: 80 });
    } catch (error) {
      this.setState({ error: `Couldn't fetch settings! ${error.message}` });
    }
  }

  async fetchProfile() {
    const userId = app.get('userId');

    if (userId === null) {
      message.warn('Couldn\'t authenticate.');

      this.setState({ loadingPercentage: 100 });

      return;
    }

    this.setState({ loadingText: 'Fetching profile' });

    try {
      const profile = await app.service('user-profile').get(userId);

      this.props.setProfile(profile);

      this.setState({ loadingPercentage: 100 });
    } catch (error) {
      this.setState({ error: `Couldn't fetch profile! ${error.message}` });
    }
  }

  handleTransitionEnd = () => {
    // When we finished loading, we don't want to disappear right away
    if (this.state.loadingPercentage === 100) {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 80);
    } else {
      this.currentStep += 1;

      this.runStep();
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
        <Helmet>
          <title>Loading...</title>
        </Helmet>

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
    setConfig: config => dispatch(setConfig(config)),
    loginUser: user => dispatch(loginUser(user)),
    setSettings: settings => dispatch(setSettings(settings)),
    setProfile: profile => dispatch(setProfile(profile)),
  };
}

export default injectSheet(styles)(
  connect(null, mapDispatchToProps)(LoadingScreen)
);
