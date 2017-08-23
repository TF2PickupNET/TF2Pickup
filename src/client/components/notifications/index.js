import { connect } from 'react-redux';
import Notifications from './notifications';

import { removeNotification } from '../../redux/notifications/actions';

export default connect((state) => {
  return { snackbars: state.notifications };
}, (dispatch) => {
  return {
    removeNotification(id) {
      return dispatch(removeNotification(id));
    },
  };
})(Notifications);
