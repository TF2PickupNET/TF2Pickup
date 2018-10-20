// @flow

import React from 'react';
import {
  Link,
  type ContextRouter,
} from 'react-router-dom';
import {
  connect,
  type MapStateToProps,
} from 'react-redux';
import injectSheet from 'react-jss';
import { Tabs } from 'antd';

import {
  gamemodes,
  regions,
} from '../../../config';
import { fetchPickups } from '../../store/pickup-queues/actions';
import { type State } from '../../store';
import { makeGetRegion } from '../../store/users/selectors';
import { getCurrentUserId } from '../../store/user-id/selectors';

type ConnectedProps = {| region: $Keys<typeof regions> | null |};
type DispatchProps = {| fetchPickups: () => void |};
type OwnProps = ContextRouter & {
  classes: {
    tabBar: string,
    link: string,
  },
};

const gamemodeNames = Object.keys(gamemodes);
const styles = {
  tabBar: {
    '& .ant-tabs-nav': {
      display: 'flex',

      '& > div': {
        flex: 1,
        display: 'flex',

        '& > .ant-tabs-tab': { flex: 1 },
      },
    },
  },

  link: {
    width: '100%',
    textAlign: 'center',
    display: 'block',
  },
};

class PickupQueue extends React.PureComponent<OwnProps & DispatchProps & ConnectedProps> {
  componentDidMount() {
    this.props.fetchPickups();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.region !== this.props.region) {
      this.props.fetchPickups();
    }
  }

  render() {
    const activeGamemode = this.props.location.pathname.slice(1);

    return (
      <Tabs
        activeKey={activeGamemode}
        tabBarGutter={0}
        className={this.props.classes.tabBar}
      >
        {gamemodeNames.map(gamemode => (
          <Tabs.TabPane
            key={gamemode}
            tab={(
              <Link
                className={this.props.classes.link}
                to={`/${gamemode}`}
              >
                {gamemodes[gamemode].display}
              </Link>
            )}
          />
        ))}
      </Tabs>
    );
  }
}

const makeMapStateToProps = (): MapStateToProps<State, OwnProps, ConnectedProps> => {
  const getRegion = makeGetRegion();

  return (state: State) => {
    return { region: getRegion(state, getCurrentUserId(state)) };
  };
};
const mapDispatchToProps = (dispatch) => {
  return { fetchPickups: () => dispatch(fetchPickups()) };
};

export default injectSheet(styles)(
  connect(makeMapStateToProps, mapDispatchToProps)(PickupQueue),
);
