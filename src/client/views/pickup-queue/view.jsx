import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import lockr from 'lockr';
import { connect } from 'react-redux';
import gamemodes from '@tf2-pickup/configs/gamemodes';
import Aux from 'react-aux';

import { getGamemodeFromUrl } from '../../../utils/pickup';
import { pluck } from '../../../utils/functions';

import Tabs from './tabs';
import Info from './info';
import Classes from './classes';

/**
 * The view for the pickup page.
 *
 * @class
 */
class View extends PureComponent {
  static propTypes = { gamemode: PropTypes.string.isRequired };

  /**
   * Set the last gamemode property in the local storage on mount.
   */
  componentWillMount() {
    lockr.set('lastGamemode', this.props.gamemode);
  }

  /**
   * Set the last gamemode property in the local storage when the props change.
   */
  componentWillReceiveProps(nextProps) {
    lockr.set('lastGamemode', nextProps.gamemode);
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
    return { gamemode: getGamemodeFromUrl(state.router.location.pathname) };
  },
)(View);
