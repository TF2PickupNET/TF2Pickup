import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';

import app from '../../app';

import Gamemode from './gamemode';

class GamemodeContainer extends PureComponent {
  componentWillReceiveProps(nextProps) {
    const nextRegion = get(nextProps, 'user.settings.region');
    const region = get(this.props, 'user.settings.region');

    if (region !== nextRegion) {
      this.updateRegion();
    }
  }

  updateRegion = () => {

  };

  join = (className) => {
    app.io.emit('pickup-queue.join', { class: className });
  };

  remove = () => {
    app.io.emit('pickup-queue.remove');
  };

  render() {
    return (
      <Gamemode
        {...this.props}
        join={this.join}
        remove={this.remove}
      />
    );
  }
}

export default connect(
  (state, ownProps) => {
    return {
      // data: state.pickups[ownProps.gamemode],
      user: state.user,
    };
  },
  (dispatch) => {
    return { dispatch };
  },
)(GamemodeContainer);
