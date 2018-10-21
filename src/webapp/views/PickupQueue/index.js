// @flow

import React from 'react';
import { type ContextRouter } from 'react-router-dom';
import {
  connect,
  type MapStateToProps,
} from 'react-redux';

import { regions } from '../../../config';
import { fetchPickups } from '../../store/pickup-queues/actions';
import { type State } from '../../store';
import { makeGetRegion } from '../../store/users/selectors';
import { getCurrentUserId } from '../../store/user-id/selectors';
import Chat from '../../components/Chat';

import Tabs from './Tabs';

type ConnectedProps = {| region: $Keys<typeof regions> | null |};
type DispatchProps = {| fetchPickups: () => void |};

class PickupQueue extends React.PureComponent<ContextRouter & DispatchProps & ConnectedProps> {
  componentDidMount() {
    this.props.fetchPickups();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.region !== this.props.region) {
      this.props.fetchPickups();
    }
  }

  getOnlineUsers() {
    return [{
      id: '76561198085010248',
      name: 'kampfkeks',
    }];
  }

  render() {
    return (
      <React.Fragment>
        <Tabs pathname={this.props.location.pathname} />

        <Chat getOnlineUsers={this.getOnlineUsers} chatId="global" />
      </React.Fragment>
    );
  }
}

const makeMapStateToProps = (): MapStateToProps<State, {}, ConnectedProps> => {
  const getRegion = makeGetRegion();

  return (state: State) => {
    return { region: getRegion(state, getCurrentUserId(state)) };
  };
};
const mapDispatchToProps = (dispatch) => {
  return { fetchPickups: () => dispatch(fetchPickups()) };
};

export default connect(makeMapStateToProps, mapDispatchToProps)(PickupQueue);
