import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import lockr from 'lockr';
import Aux from 'react-aux';
import gamemodes from '@tf2-pickup/configs/gamemodes';

import PickupContainer from './pickup-container';

/**
 * The view for the pickup page.
 *
 * @class
 */
export default class View extends PureComponent {
  /**
   * Set the last gamemode property in the local storage on mount.
   */
  componentWillMount() {
    lockr.set('lastGamemode', this.getCurrentGamemode());
  }

  /**
   * Set the last gamemode property in the local storage when the props change.
   */
  componentWillReceiveProps(nextProps) {
    lockr.set('lastGamemode', this.getCurrentGamemode(nextProps));
  }

  /**
   * Compute the current title for the gamemode.
   *
   * @returns {String} - Returns the title.
   */
  getTitle() {
    return gamemodes[this.getCurrentGamemode()].display;
  }

  /**
   * Compute the current gamemode based on the url.
   *
   * @param {Object} [props] - The props to use.
   * We need this as we change the local storage inside componentWillReceiveProps and we get
   * the new props as an argument.
   * @returns {String} - Returns the current gamemode.
   */
  getCurrentGamemode(props = this.props) {
    return props.location.pathname.slice(1);
  }

  render() {
    const gamemode = this.getCurrentGamemode();

    return (
      <Aux>
        <Helmet>
          <title>{this.getTitle()}</title>
        </Helmet>

        <PickupContainer gamemode={gamemode} />
      </Aux>
    );
  }
}
