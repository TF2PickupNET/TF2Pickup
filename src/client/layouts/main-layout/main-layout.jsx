import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Drawer } from 'materialize-react';
import { devices } from 'materialize-react/lib/styles/breakpoints';

import DrawerContent from './drawer-content';
import MainToolbar from './main-toolbar';

/**
 * The main layout for all the routes except the landing page.
 *
 * @class
 */
export default class MainLayout extends PureComponent {
  static propTypes = { children: PropTypes.node.isRequired };

  /**
   * Close the drawer.
   */
  closeDrawer = () => {
    this.drawer.close();
  };

  /**
   * Open the drawer when the menu button is pressed.
   */
  handleMenuButtonPress = () => {
    this.drawer.open();
  };

  render() {
    return (
      <Drawer
        closeOnBackdropClick
        responsiveWidth={devices.tablet[1]}
        ref={(element) => { this.drawer = element; }}
      >
        <Drawer.DrawerContent>
          <DrawerContent closeDrawer={this.closeDrawer} />
        </Drawer.DrawerContent>

        <Drawer.MainContent>
          <MainToolbar onMenuButtonPress={this.handleMenuButtonPress} />

          <div>
            {this.props.children}
          </div>
        </Drawer.MainContent>
      </Drawer>
    );
  }
}
