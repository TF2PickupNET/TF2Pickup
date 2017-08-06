import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import LandingPage from './landing-page';

/**
 * Connect the LandingPage with redux.
 *
 * @param {Function} dispatch - The dispatch function from redux.
 * @returns {Object} - Returns the props for the LandingPageView component.
 */
function mapDispatchToProps(dispatch) {
  return {
    redirect(url) {
      return dispatch(push(url));
    },
  };
}

export default connect(null, mapDispatchToProps)(LandingPage);
