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
import { fetchUser } from '../../store/users/actions';
import { type State } from '../../store';
import { getCurrentUserId } from '../../store/user-id/selectors';

type Props = {
  classes: {
    container: string,
    text: string,
  },
  userId: string | null,
  children: Node,
  fetchProfile: (userId: string) => void,
  fetchUser: (userId: string) => void,
  fetchSettings: () => void,
  fetchConfig: () => void,
};
type LocalState = {
  isLoading: boolean,
  loadingPercentage: number,
  loadingText: string,
};

const styles = {
  container: { minHeight: '100vh' },

  text: { textAlign: 'center' },
};

class LoadingScreen extends React.PureComponent<Props, LocalState> {
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
      await app.authenticate({
        strategy: 'jwt',
        accessToken: window.localStorage.getItem('feathers-jwt'),
      });

      this.setState({ loadingPercentage: 45 });
    } catch (error) {
      message.warn(`Couldn't authenticate. ${error.message}`);

      window.localStorage.removeItem('feathers-jwt');

      this.setState({ loadingPercentage: 100 });
    }
  }

  async fetchUser() {
    const { userId } = this.props;

    if (userId === null) {
      message.warn('Couldn\'t authenticate.');

      this.setState({ loadingPercentage: 100 });

      return;
    }

    this.setState({ loadingText: 'Fetching user' });

    this.props.fetchUser(userId);

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

    this.setState({ loadingText: 'Fetching user profile' });

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

const mapStateToProps = (state: State): $Shape<Props> => {
  return { userId: getCurrentUserId(state) };
};

const mapDispatchToProps: MapDispatchToProps<Props> = (dispatch) => {
  return {
    fetchUser: userId => dispatch(fetchUser(userId)),
    fetchConfig: () => dispatch(fetchConfig()),
    fetchSettings: () => dispatch(fetchSettings()),
    fetchProfile: userId => dispatch(fetchProfile(userId)),
  };
};

export default injectSheet(styles)(
  connect(mapStateToProps, mapDispatchToProps)(LoadingScreen)
);
