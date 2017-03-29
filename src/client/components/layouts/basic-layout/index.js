import { connect } from 'react-redux';

import BasicLayout from './basic-layout';

import { addNotification } from '/src/client/redux/notifications/actions';

function mapDispatchToProps(dispatch) {
  return {
    addNotification(text, timeout = '30s') {
      return dispatch(addNotification(text, timeout));
    },
  };
}

export default connect(null, mapDispatchToProps)(BasicLayout);
