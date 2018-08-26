// @flow

import React from 'react';
import {
  Row,
  Col,
  Spin,
  message,
} from 'antd';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import {
  type User,
  type UserProfile,
} from '../../../types';
import app from '../../app';
import getUserFromState from '../../utils/get-user-from-state';
import { addUser } from '../../store/users/actions';

import { Provider } from './context';

type Props = {
  user: User | null,
  isLoggedInUser: boolean,
  addUser: (user: User) => null,
  match: { params: { userId: string } },
};
type State = {
  profile: UserProfile | null,
  error: Error | null,
};

class Profile extends React.PureComponent<Props, State> {
  state = {
    profile: null,
    error: null,
  };

  componentDidMount() {
    const { userId } = this.props.match.params;

    if (this.props.user === null) {
      this.fetchUser(userId);
    } else {
      this.fetchProfile(userId);
    }
  }

  async fetchUser(userId) {
    try {
      const user = await app.service('users').get(userId);

      this.props.addUser(user);

      this.fetchProfile(userId);
    } catch (error) {
      message.error(`Couldn't load user: ${error.message}`);

      this.setState({ error });
    }
  }

  async fetchProfile(userId) {
    try {
      const profile = await app.service('user-profile').get(userId);

      this.setState({ profile });
    } catch (error) {
      message.error(`Couldn't load profile for user: ${error.message}`);

      this.setState({ error });
    }
  }

  renderLoadingScreen() {
    return (
      <Row>
        <Helmet>
          <title>Loading...</title>
        </Helmet>

        <Col>
          <Spin delay={100} />
        </Col>
      </Row>
    );
  }
  
  render() {
    if (this.props.user === null || this.state.profile === null) {
      return this.renderLoadingScreen();
    }

    if (this.state.error !== null) {
      return (
        <div>
          Hey
        </div>
      );
    }

    return (
      <Provider value={this.state.profile}>
        <Helmet>
          <title>
            {this.props.isLoggedInUser
              ? 'Your Profile'
              : `Profile of ${this.props.user.name}`
            }
          </title>
        </Helmet>
      </Provider>
    );
  }
}

export default connect(
  (state, props) => {
    const user = getUserFromState(state, props.match.params.userId);

    return {
      user,
      isLoggedInUser: user ? user.id === state.user.id : false,
    };
  },
  (dispatch) => {
    return { addUser: user => dispatch(addUser(user)) };
  },
)(Profile);
