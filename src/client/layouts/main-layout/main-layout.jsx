import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import {
  Drawer,
  breakpoints,
  Layout,
} from 'materialize-react';
import { devices } from 'materialize-react/lib/styles/breakpoints';

import ErrorBoundary from '../../components/error-boundary';
import { CLOSE_DRAWER } from '../../redux/drawer-opened/constants';

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
    open: PropTypes.bool.isRequired,
    onCloseDrawer: PropTypes.func.isRequired,
  };

  static styles = {
    content: {
      display: 'flex',
      width: '100%',
      overflowX: 'hidden',
      alignItems: 'center',
      flexDirection: 'column',
      overflowY: 'scroll',
      padding: 16,
      boxSizing: 'border-box',
      flex: 1,
    },

    container: {
      display: 'flex',
      flexDirection: 'column',
    }
  };

  render() {
    return (
      <Drawer
        responsiveWidth={devices.tablet[1]}
        open={this.props.open}
        onCloseRequest={this.props.onCloseDrawer}
      >
        <Drawer.DrawerContent>
          <DrawerContent />
        </Drawer.DrawerContent>

        <Drawer.MainContent className={this.props.classes.container}>
          <MainToolbar />

          <ErrorBoundary>
            <div className={this.props.classes.content}>
              {this.props.children}
            </div>
          </ErrorBoundary>
        </Drawer.MainContent>
      </Drawer>
    );
  }
}

export default connect(
  (state) => {
    return { open: state.drawerOpened };
  },
  (dispatch) => {
    return { onCloseDrawer: () => dispatch({ type: CLOSE_DRAWER }) };
  },
)(injectSheet(MainLayout.styles)(MainLayout));
