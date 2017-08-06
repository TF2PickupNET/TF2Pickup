import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

/**
 * Redirect the user to the correct url.
 *
 * @class
 */
class RedirectToPickup extends PureComponent {
  static propTypes = {
    redirect: PropTypes.func.isRequired,
    to: PropTypes.string.isRequired,
  };

  /**
   * Redirect the user when the component has mounted.
   */
  componentDidMount() {
    this.props.redirect(this.props.to);
  }

  render() {
    return 'Redirecting';
  }
}

/**
 * Connect the Redirect with redux.
 *
 * @param {Function} dispatch - The dispatch function from redux.
 * @returns {Object} - Returns the props for the BasicLayout component.
 */
function mapDispatchToProps(dispatch) {
  return {
    redirect(url) {
      return dispatch(push(url));
    },
  };
}

export default connect(null, mapDispatchToProps)(RedirectToPickup);
