// @flow

import React from 'react';
import {
  Row,
  Col,
  Spin,
} from 'antd';
import {
  connect,
  type MapStateToProps,
} from 'react-redux';
import Helmet from 'react-helmet';
import { createSelector } from 'reselect';

import { fetchUser } from '../../store/users/actions';
import { fetchProfile } from '../../store/user-profiles/actions';
import {
  makeGetUserById,
  makeGetUserName,
} from '../../store/users/selectors';
import { makeIsCurrentUser } from '../../store/user-id/selectors';
import { makeGetProfileById } from '../../store/user-profiles/selectors';
import { type State } from '../../store';

import TopBar from './TopBar';
import Links from './Links';

type ConnectedProps = {|
  hasLoadedUser: boolean,
  hasLoadedProfile: boolean,
  name: string | null,
  isCurrentUser: boolean,
|};
type OwnProps = {
  fetchUser: (userId: string) => void,
  fetchProfile: (userId: string) => void,
  match: { params: { userId: string } },
};

class Profile extends React.PureComponent<ConnectedProps & OwnProps> {
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

    const title = this.props.isCurrentUser
      ? 'Your Profile'
      : `Profile of ${this.props.name === null ? 'Unknown' : this.props.name}`;

    const { userId } = this.props.match.params;

    return (
      <React.Fragment>
        <Helmet>
          <title>{title}</title>
        </Helmet>

        <TopBar userId={userId} />

        <div style={{ marginTop: 16 }}>
          <Links userId={userId} />
        </div>
      </React.Fragment>
    );
  }
}

const makeMapState = (): MapStateToProps<State, OwnProps, ConnectedProps> => {
  const hasLoadedUser = createSelector(
    makeGetUserById(),
    user => user !== null,
  );
  const hasLoadedProfile = createSelector(
    makeGetProfileById(),
    profile => profile !== null,
  );
  const isCurrentUser = makeIsCurrentUser();
  const getUserName = makeGetUserName();

  return (state, props) => {
    return {
      hasLoadedUser: hasLoadedUser(state, props.match.params.userId),
      hasLoadedProfile: hasLoadedProfile(state, props.match.params.userId),
      isCurrentUser: isCurrentUser(state, props.match.params.userId),
      name: getUserName(state, props.match.params.userId),
    };
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: userId => dispatch(fetchUser(userId)),
    fetchProfile: userId => dispatch(fetchProfile(userId)),
  };
};

export default connect(makeMapState, mapDispatchToProps)(Profile);
