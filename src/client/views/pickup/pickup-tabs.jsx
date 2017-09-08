import React, { PureComponent } from 'react';
import {
  Tabs,
  Tab,
} from 'materialize-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import injectSheet from 'react-jss';

import gamemodes from '@tf2-pickup/configs/gamemodes';

class PickupTabs extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape({ tabs: PropTypes.string.isRequired }).isRequired,
    gamemode: PropTypes.oneOf(Object.keys(gamemodes)).isRequired,
    redirect: PropTypes.func.isRequired,
  };

  static styles = {
    tabs: {
      justifyContent: 'center',
      flexWrap: 'nowrap',
    },
  };

  componentDidUpdate(prevProps) {
    if (prevProps.gamemode !== this.props.gamemode) {
      this.tabs.currentTab = this.props.gamemode;
    }
  }

  handleChange = (gamemode) => {
    this.props.redirect(`/${gamemode}`);
  };

  render() {
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
          >
            {gamemode.display}
          </Tab>
        ))}
      </Tabs>
    );
  }
}

export default connect(
  null,
  (dispatch) => {
    return { redirect: url => dispatch(push(url)) };
  },
)(injectSheet(PickupTabs.styles)(PickupTabs));
