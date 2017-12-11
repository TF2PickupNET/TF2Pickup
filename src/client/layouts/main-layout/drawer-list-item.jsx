import React, { PureComponent } from 'react';
import {
  List,
  Ripple,
  getNotDeclaredProps,
} from 'materialize-react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

import { CLOSE_DRAWER } from '../../redux/drawer-opened/constants';

/**
 * The list item for the drawer.
 *
 * @class
 */
class DrawerListItem extends PureComponent {
  static propTypes = {
    redirectTo: PropTypes.string,
    redirect: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    closeDrawer: PropTypes.func.isRequired,
  };

  static defaultProps = {
    redirectTo: null,
    onClick: () => {},
  };

  /**
   * Close the drawer and call the onClick prop or redirect the user to a new page.
   */
  handleClick = () => {
    if (this.props.redirectTo) {
      this.props.redirect(this.props.redirectTo);
    }

    this.props.onClick();

    this.props.closeDrawer();
  };

  render() {
    return (
      <List.Item
        inset
        onClick={this.handleClick}
        {...getNotDeclaredProps(this.props, DrawerListItem)}
      >
        {this.props.children}

        <Ripple />
      </List.Item>
    );
  }
}

export default connect(
  null,
  (dispatch) => {
    return {
      redirect: url => dispatch(push(url)),
      closeDrawer: () => dispatch({ type: CLOSE_DRAWER }),
    };
  },
)(DrawerListItem);
