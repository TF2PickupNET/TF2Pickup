import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import lockr from 'lockr';
import { connect } from 'react-redux';
import gamemodes from '@tf2-pickup/configs/gamemodes';
import Aux from 'react-aux';

import { getGamemodeFromUrl } from '../../../utils/pickup';
import {
  arrayToObject,
  pluck,
} from '../../../utils/functions';
import app from '../../app';
import { updatePickups } from '../../redux/pickup-queue/actions';

import Tabs from './tabs';
import Info from './info';
import Classes from './classes';

/**
 * The view for the pickup page.
 *
 * @class
 */
class View extends PureComponent {
  static propTypes = {
    gamemode: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    connected: PropTypes.bool.isRequired,
    updatePickups: PropTypes.func.isRequired,
  };

  /**
   * Set the last gamemode property in the local storage on mount.
   */
  componentWillMount() {
    lockr.set('lastGamemode', this.props.gamemode);

    this.updatePickups(this.props.region);
  }

  /**
   * Update the pickups when the user reconnects or the user changes the region.
   */
  componentWillReceiveProps(nextProps) {
    const reconnected = nextProps.connected && !this.props.connected;

    lockr.set('lastGamemode', nextProps.gamemode);

    if (reconnected || this.props.region !== nextProps.region) {
      this.updatePickups(nextProps.region);
    }
  }

  /**
   * Fetch the pickups for the passed region.
   *
   * @param {String} region - The regions name.
   */
  async updatePickups(region) {
    const pickups = await app.service('pickup-queue').find({ query: { region } });

    this.props.updatePickups(arrayToObject(pickup => pickup.gamemode)(pickups));
  }

  /**
   * Compute the current title for the gamemode.
   *
   * @returns {String} - Returns the title.
   */
  getTitle() {
    return pluck(`${this.props.gamemode}.display`, '')(gamemodes);
  }

  render() {
    return (
      <Aux>
        <Helmet>
          <title>{this.getTitle()}</title>
        </Helmet>

        <Tabs />

        <Info />

        <Classes />
      </Aux>
    );
  }
}

export default connect(
  (state) => {
    return {
      gamemode: getGamemodeFromUrl(state.router.location.pathname),
      region: pluck('settings.region', 'eu')(state.user),
      connected: state.connected,
    };
  },
  (dispatch) => {
    return { updatePickups: pickups => dispatch(updatePickups(pickups)) };
  },
)(View);
