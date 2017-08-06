import { connect } from 'react-redux';

import BasicLayout from './basic-layout';

import { addNotification } from '../../redux/notifications/actions';

/**
 * Connect the BasicLayout with redux.
 *
 * @param {Function} dispatch - The dispatch function from redux.
 * @returns {Object} - Returns the props for the BasicLayout component.
 */
function mapDispatchToProps(dispatch) {
  return {
    addNotification(text, timeout = '30s') {
      return dispatch(addNotification(text, timeout));
    },
  };
}

export default connect(null, mapDispatchToProps)(BasicLayout);
