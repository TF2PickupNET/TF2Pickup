import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';
import lockr from 'lockr';

import gamemodes from '@tf2-pickup/configs/gamemodes';

import PickupTabs from './pickup-tabs';
import Classes from './gamemode-container';

/**
 * The view for the pickup page.
 *
 * @class
 */
class View extends PureComponent {
  static styles = {
    container: {
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  };

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
      <div className={this.props.classes.container}>
        <Helmet>
          <title>{this.getTitle()}</title>
        </Helmet>

        <PickupTabs gamemode={gamemode} />

        <Classes gamemode={gamemode} />
      </div>
    );
  }
}

export default injectSheet(View.styles)(View);
