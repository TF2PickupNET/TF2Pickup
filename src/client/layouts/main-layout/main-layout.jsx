import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import {
  Drawer,
  breakpoints,
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
    classes: PropTypes.shape({
      container: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      drawer: PropTypes.string.isRequired,
      drawerContent: PropTypes.string.isRequired,
    }).isRequired,
    open: PropTypes.bool.isRequired,
    onCloseDrawer: PropTypes.func.isRequired,
  };

  static styles = {
    drawer: {
      flex: 1,
      height: 'auto',
    },

    content: {
      composes: 'scrollbar',
      display: 'flex',
      width: '100%',
      overflowX: 'hidden',
      alignItems: 'center',
      flexDirection: 'column',
      overflowY: 'scroll',
      padding: 16,
      height: '100%',
      boxSizing: 'border-box',
      flex: 1,

      [breakpoints.only('desktop')]: { padding: 24 },
    },

    drawerContent: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto 1fr',
    },

    container: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
  };

  render() {
    return (
      <Drawer
        responsiveWidth={devices.tablet[1]}
        open={this.props.open}
        className={this.props.classes.drawer}
        onCloseRequest={this.props.onCloseDrawer}
      >
        <Drawer.DrawerContent className={this.props.classes.drawerContent}>
          <DrawerContent />
        </Drawer.DrawerContent>

        <Drawer.MainContent className={this.props.classes.container}>
          <MainToolbar />

          <div className={this.props.classes.content}>
            <ErrorBoundary>
              {this.props.children}
            </ErrorBoundary>
          </div>
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
