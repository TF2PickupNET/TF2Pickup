import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Snackbar } from 'materialize-react';

import { removeNotification } from '../../redux/notifications/actions';

/**
 * Render the snackbars on the page.
 *
 * @param {Object} props - The props for the component.
 * @returns {JSX} - Returns the JSX.
 */
function Notifications(props) {
  return (
    <Snackbar
      snackbars={props.snackbars}
      onRemoveSnackbar={props.onRemoveNotification}
    />
  );
}

Notifications.propTypes = {
  onRemoveNotification: PropTypes.func.isRequired,
  snackbars: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(
  (state) => {
    return { snackbars: state.notifications };
  },
  (dispatch) => {
    return { onRemoveNotification: () => dispatch(removeNotification()) };
  },
)(Notifications);
