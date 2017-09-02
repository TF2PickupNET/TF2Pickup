import { connect } from 'react-redux';

import { removeNotification } from '../../redux/notifications/actions';

import Notifications from './notifications';

export default connect((state) => {
  return { snackbars: state.notifications };
}, (dispatch) => {
  return {
    removeNotification(id) {
      return dispatch(removeNotification(id));
    },
  };
})(Notifications);
