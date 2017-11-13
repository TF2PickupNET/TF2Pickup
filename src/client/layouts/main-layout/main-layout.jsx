import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import {
  Drawer,
  breakpoints,
  Layout,
} from 'materialize-react';
import { devices } from 'materialize-react/lib/styles/breakpoints';

import DrawerContent from './drawer-content';
import MainToolbar from './main-toolbar';

/**
 * The main layout for all the routes except the landing page.
 *
 * @class
 */
class MainLayout extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.shape({ container: PropTypes.string }).isRequired,
  };

  static styles = {
    container: {
      padding: 16,
      overflowX: 'hidden',

      [breakpoints.up('tablet')]: { padding: 24 },
    },
  };

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
        responsiveWidth={devices.tablet[1]}
        ref={(element) => { this.drawer = element; }}
      >
        <Drawer.DrawerContent>
          <DrawerContent closeDrawer={this.closeDrawer} />
        </Drawer.DrawerContent>

        <Drawer.MainContent>
          <MainToolbar onMenuButtonPress={this.handleMenuButtonPress} />

          <Layout
            direction="column"
            crossAlign="center"
            className={this.props.classes.container}
          >
            {this.props.children}
          </Layout>
        </Drawer.MainContent>
      </Drawer>
    );
  }
}

export default injectSheet(MainLayout.styles)(MainLayout);
