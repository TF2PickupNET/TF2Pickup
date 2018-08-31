// @flow

import React, { type Node } from 'react';
import injectSheet from 'react-jss';
import {
  connect,
  type MapDispatchToProps,
} from 'react-redux';
import sleep from 'sleep-promise';
import {
  Row,
  Col,
  Progress,
  message,
} from 'antd';
import Helmet from 'react-helmet';

import app from '../../app';
import { fetchConfig } from '../../store/config/actions';
import { fetchSettings } from '../../store/settings/actions';
import { fetchProfile } from '../../store/user-profiles/actions';
import { type UserId } from '../../../types/user';
import { fetchUser } from '../../store/users/actions';

type Props = {
  classes: {
    container: string,
    text: string,
  },
  userId: UserId,
  children: Node,
  fetchProfile: (userId: string) => void,
  fetchUser: (userId: string) => void,
  fetchSettings: () => void,
  fetchConfig: () => void,
};
type State = {
  isLoading: boolean,
  loadingPercentage: number,
  loadingText: string,
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
    this.props.fetchConfig();

    await sleep(50);

    this.setState({ loadingPercentage: 30 });
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
    if (this.props.userId === null) {
      message.warn('Couldn\'t authenticate.');

      this.setState({ loadingPercentage: 100 });

      return;
    }

    this.setState({ loadingText: 'Fetching user' });

    this.props.fetchUser(this.props.userId);

    await sleep(50);

    this.setState({ loadingPercentage: 60 });
  }

  async fetchSettings() {
    this.setState({ loadingText: 'Fetching settings' });

    this.props.fetchSettings();

    await sleep(50);

    this.setState({ loadingPercentage: 80 });
  }

  async fetchProfile() {
    const userId = this.props.userId;

    if (userId === null) {
      message.warn('Couldn\'t authenticate.');

      this.setState({ loadingPercentage: 100 });

      return;
    }

    this.setState({ loadingText: 'Fetching user-profiles' });

    this.props.fetchProfile(userId);

    await sleep(50);

    this.setState({ loadingPercentage: 100 });
  }

  handleTransitionEnd = () => {
    // When we finished loading, we don't want to disappear right away
    if (this.state.loadingPercentage === 100) {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 50);
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
            status="active"
            onTransitionEnd={this.handleTransitionEnd}
          />

          <p className={this.props.classes.text}>
            {this.state.loadingText}
          </p>
        </Col>
      </Row>
    );
  }

  render() {
    return this.state.isLoading ? this.renderLoadingScreen() : this.props.children;
  }
}

const mapDispatchToProps: MapDispatchToProps<Props> = (dispatch) => {
  return {
    fetchUser: userId => dispatch(fetchUser(userId)),
    fetchConfig: () => dispatch(fetchConfig()),
    fetchSettings: () => dispatch(fetchSettings()),
    fetchProfile: userId => dispatch(fetchProfile(userId)),
  };
};

export default injectSheet(styles)(
  connect(null, mapDispatchToProps)(LoadingScreen)
);
