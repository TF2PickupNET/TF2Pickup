import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Dialog } from 'materialize-react';

import DialogComponent from './dialog';

class PostUserCreationDialog extends PureComponent {
  static propTypes = { user: PropTypes.shape({ name: PropTypes.string }) };

  static defaultProps = { user: null };

  componentWillReceiveProps(nextProps) {
    if (this.props.user === null && nextProps.user !== null) {
      if (nextProps.user.name === null) {
        this.dialog.open();
      }
    }
  }

  render() {
    return (
      <Dialog
        ref={(element) => { this.dialog = element; }}
        closeOnOutsideClick={false}
        component={DialogComponent}
      />
    );
  }
}

export default connect(
  (state) => {
    return { user: state.user };
  },
)(PostUserCreationDialog);
