import React, { PureComponent } from 'react';
import {
  Tabs,
  Tab,
  breakpoints,
  Typography,
} from 'materialize-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import flatten from 'lodash.flatten';
import injectSheet from 'react-jss';
import get from 'lodash.get';

import gamemodes from '@tf2-pickup/configs/gamemodes';

import createNotification from '../../utils/create-notification';

class PickupTabs extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({
      tabs: PropTypes.string.isRequired,
      tab: PropTypes.string.isRequired,
    }).isRequired,
    gamemode: PropTypes.oneOf(Object.keys(gamemodes)).isRequired,
    redirect: PropTypes.func.isRequired,
  };

  static styles = {
    tabs: {
      justifyContent: 'center',
      flexWrap: 'nowrap',
      marginBottom: 24,

      [breakpoints.down('mobile')]: { display: 'none' },
    },

    tab: { '& > .tab--content': { textTransform: 'none' } },

    playerCount: {
      padding: '0 4px',
      lineHeight: 1,
    },
  };

  static countPlayers(pickup) {
    if (!pickup) {
      return 0;
    }

    return flatten(Object.values(pickup.classes)).length;
  }

  componentWillReceiveProps(nextProps) {
    Object
      .values(nextProps.pickups)
      .forEach((pickup) => {
        const oldPickup = this.props.pickups[pickup.gamemode];

        if (pickup.status === 'ready-up' && oldPickup.status === 'waiting') {
          const userId = get(this.props, 'user.id', null);
          const players = flatten(Object.values(pickup.classes));
          const isInPickup = players.some(({ id }) => id === userId);
          const gamemode = gamemodes[pickup.gamemode];

          if (isInPickup) {
            if (this.props.gamemode !== pickup.gamemode) {
              this.props.redirect(`/${pickup.gamemode}`);
            }

            createNotification('Ready Up', {
              timeout: gamemode.readyUpTime * 1000,
              body: `Your ${gamemode.display} is ready`,
            });
          }
        }
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.gamemode !== this.props.gamemode) {
      this.tabs.currentTab = this.props.gamemode;
    }
  }

  handleChange = (gamemode) => {
    this.props.redirect(`/${gamemode}`);
  };

  render() {
    const { pickups } = this.props;

    return (
      <Tabs
        initialTab={this.props.gamemode}
        className={this.props.classes.tabs}
        ref={(element) => { this.tabs = element; }}
        onChange={this.handleChange}
      >
        {Object.values(gamemodes).map(gamemode => (
          <Tab
            key={gamemode.name}
            name={gamemode.name}
            className={this.props.classes.tab}
          >
            {gamemode.display}

            <Typography
              secondary
              typography="body1"
              className={this.props.classes.playerCount}
            >
              ({PickupTabs.countPlayers(pickups[gamemode.name])} / {gamemode.maxPlayers})
            </Typography>
          </Tab>
        ))}
      </Tabs>
    );
  }
}

export default connect(
  (state) => {
    return {
      user: state.user,
      pickups: state.pickupQueue,
    };
  },
  (dispatch) => {
    return { redirect: url => dispatch(push(url)) };
  },
)(injectSheet(PickupTabs.styles)(PickupTabs));
