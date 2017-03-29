import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import Pickup from './pickup';

function mapDispatchToProps(dispatch) {
  return {
    redirect(url) {
      return dispatch(push(url));
    },
  };
}

export default connect(null, mapDispatchToProps)(Pickup);
