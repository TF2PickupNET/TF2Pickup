// @flow

import React from 'react';
import {
  Row,
  Col,
  Spin,
} from 'antd';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createSelector } from 'reselect';

import { fetchUser } from '../../store/users/actions';
import { fetchProfile } from '../../store/user-profiles/actions';
import { makeGetUserById } from '../../store/users/selectors';
import { type State } from '../../store';
import {
  getCurrentUser,
  makeIsCurrentUser,
} from '../../store/user-id/selectors';
import { makeGetProfileById } from '../../store/user-profiles/selectors';
import { type User } from '../../../types/user';

type Props = {
  hasLoadedUser: boolean,
  hasLoadedProfile: boolean,
  name: string,
  isCurrentUser: boolean,
  fetchUser: (userId: string) => void,
  fetchProfile: (userId: string) => void,
  match: { params: { userId: string } },
};

class Profile extends React.PureComponent<Props> {
  componentDidMount() {
    const { userId } = this.props.match.params;

    if (!this.props.hasLoadedUser) {
      this.props.fetchUser(userId);
    }

    if (!this.props.hasLoadedProfile) {
      this.props.fetchProfile(userId);
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
    if (!this.props.hasLoadedUser || !this.props.hasLoadedProfile) {
      return this.renderLoadingScreen();
    }

    return (
      <React.Fragment>
        <Helmet>
          <title>
            {this.props.isCurrentUser
              ? 'Your Profile'
              : `Profile of ${this.props.name}`}
          </title>
        </Helmet>
      </React.Fragment>
    );
  }
}

const getCurrentUsersName = createSelector(
  getCurrentUser(),
  (user: User) => user.name,
);

const makeMapState = () => {
  const hasLoadedUser = createSelector(
    makeGetUserById(),
    user => user !== null,
  );
  const hasLoadedProfile = createSelector(
    makeGetProfileById(),
    profile => profile !== null,
  );
  const isCurrentUser = makeIsCurrentUser();

  return (state: State, props: Props): $Shape<Props> => {
    return {
      hasLoadedUser: hasLoadedUser(state, props.match.params.userId),
      hasLoadedProfile: hasLoadedProfile(state, props.match.params.userId),
      isCurrentUser: isCurrentUser(state, props.match.params.userId),
      name: getCurrentUsersName(state),
    };
  };
};

export default connect(
  makeMapState,
  (dispatch) => {
    return {
      fetchUser: userId => dispatch(fetchUser(userId)),
      fetchProfile: userId => dispatch(fetchProfile(userId)),
    };
  },
)(Profile);
