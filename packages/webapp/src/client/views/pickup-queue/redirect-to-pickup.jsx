import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

import getAlias from '../../../utils/get-alias';

/**
 * Redirect the user to the correct url.
 *
 * @class
 */
class RedirectToPickup extends PureComponent {
  static propTypes = {
    redirect: PropTypes.func.isRequired,
    location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
  };

  /**
   * Redirect the user when the component has mounted.
   */
  componentDidMount() {
    const url = this.props.location.pathname;
    const alias = url.slice(1);

    this.props.redirect(`/${getAlias(alias)}`);
  }

  render() {
    return null;
  }
}

export default connect(null, (dispatch) => {
  return { redirect: url => dispatch(push(url)) };
})(RedirectToPickup);
