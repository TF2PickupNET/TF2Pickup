import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';

import gamemodes from '@tf2-pickup/configs/gamemodes';

import PickupTabs from './pickup-tabs';

/**
 * The view for the pickup page.
 *
 * @class
 */
class View extends PureComponent {
  static styles = {
    container: {
      padding: '40px 25px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  };

  /**
   * Compute the current title for the gamemode.
   *
   * @returns {String} - Returns the title.
   */
  getTitle() {
    return gamemodes[this.getCurrentGamemode()].display;
  }

  getCurrentGamemode() {
    return this.props.location.pathname.slice(1);
  }

  render() {
    return (
      <div className={this.props.classes.container}>
        <Helmet>
          <title>{this.getTitle()}</title>
        </Helmet>

        <PickupTabs gamemode={this.getCurrentGamemode()} />
      </div>
    );
  }
}

export default injectSheet(View.styles)(View);
